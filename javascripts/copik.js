(function () {

  if (!window.Copik) { window.Copik = {}; }

  /**
   * Get the hexadecimal color value for a given
   * color name. If a hexadecimal color is given
   * it will return the formatted value.
   * @param {string} colorName The color name
   * @returns {string} The hexadecimal value in the format of #xxxxxx
   */
  function getColorValue(colorName) {
    if (/[a-f0-9]{6}/i.test(colorName)) { return '#' + colorName.replace(/#/, ''); }
    var colorVal = Copik.colorNames[colorName.toLowerCase()];
    if (!colorVal) { return null; }
    return '#' + colorVal.toString().replace(/#/, '');
  };

  /**
   * Creates a new swatch color node with the given color.
   * @param {string} color The color for the node
   * @param {int} size The color node size
   * @param {int} margin The margin between colors
   * @returns {object} The swatch color node
   */
  function createSwatchColorNode(color, size, margin) {
    var itemNode = $('<li></li>'),
      linkNode = $('<a></a>'),
      colorValue = getColorValue(color);
    
    linkNode
      .css({
        'background-color': colorValue,
        height: size + 'px',
        margin: margin + 'px',
        width: size + 'px'
      })
      .attr('href', colorValue)
      .attr('data-copik-color', colorValue);

    return itemNode.append(linkNode);
  }

  /**
   * Creates a new instance of Copik.
   * If a selector is passes as the node, it will only use the first object in the resulting array
   * @param {object|selector} node The html node that will open up the swatch and display the active color.
   * @param {object} options The settings object
   */
  Copik = function (node, options) {
    this.opts = $.extend(true, {}, Copik.default, options);
    this.node = $(node).eq(0);

    this.setup();
    this.wireEvents();

    this.updateSwatchPosition();
    if (!this.opts.autoOpen) { this.swatch.hide(); }
    this.setColor(this.opts.activeColor);
  };

  Copik.prototype = {
    /**
     * Setups copik instance
     */
    setup: function () {
      var opts = this.opts,
        node = this.node,
        pickerColorNode = (this.pickerColorNode = $('<span></span>')),
        swatch = (this.swatch = $('<ul></ul>'));
      this.linkedInputNode = $(opts.linkedInput);
      this.observers = [];

      opts.colorSize = parseInt(opts.colorSize);
      opts.colorMargin = parseInt(opts.colorMargin);
      opts.swatchPositionMargin = parseInt(opts.swatchPositionMargin);

      node
        .addClass('copik')
        .attr('href', '#openSwatch')
        .append(pickerColorNode)
        .data('copik', this);

      var size = opts.colorSize,
        margin = opts.colorMargin;
      for (var i=0, f=opts.colors.length; i < f; i++) {
        var color = opts.colors[i];
        swatch.append(createSwatchColorNode(color, size, margin))
      }

      swatch
        .addClass('clearfix copik-swatch')
        .appendTo(node.parent())
        .width($('li:first', swatch).outerWidth() * opts.swatchColumns)
        .data('copik', this);
    },
    /**
     * Wires the events functionality
     */
    wireEvents: function () {
      var self = this,
        opts = this.opts,
        mouseoutTO = null;

      function setCloseTimeout() {
        mouseoutTO = setTimeout(function () {
            self.close();
        }, 400);
      }

      self.node
        .click(function (e) {
          self.swatch.is(':visible') 
            ? self.close()
            : self.open();
          return false;
        })
        .mouseenter(function () { clearTimeout(mouseoutTO); })
        .mouseleave(function () { setCloseTimeout(); })

      self.swatch
        .delegate('a', 'click', function (e) {
          var color = $(this).attr('data-copik-color');
          self.setColor(color);
          if (self.opts.closeOnPick) { self.close(); }
          return false;
        })
        .mouseenter(function () { clearTimeout(mouseoutTO); })
        .mouseleave(function () { setCloseTimeout(); });

    },
    /**
     * Opens up the swatch panel
     */
    open: function () {
      var openEffect = this.opts.openEffect,
        duration = openEffect.duration,
        swatch = this.swatch;

      switch (openEffect.animation) {
        case 'slide':
          swatch.slideDown(duration);
          break;
        case 'fade':
          swatch.fadeIn(duration);
          break;
        default:
          swatch.show(duration);
          break;
      }
    },
    /**
     * Closes the swatch panel.
     */
    close: function () {
      var closeEffect = this.opts.closeEffect,
        duration = closeEffect.duration,
        swatch = this.swatch;

      switch (closeEffect.animation) {
        case 'slide':
          swatch.slideUp(duration);
          break;
        case 'fade':
          swatch.fadeOut(duration);
          break;
        default:
          swatch.show(duration);
          break;
      }
    },
    /**
     * Sets the active color.
     * @param {string} color The new active color
     */
    setColor: function (color) {
      var colorValue = getColorValue(color);
      this.pickerColorNode.css('background-color', colorValue);
      this.linkedInputNode.val(colorValue);
      this.fireChangeEvent(colorValue);
    },
    /**
     * Returns the current selected color.
     * @returns {string} The active color
     */
    getColor: function () {
      return this.pickerColorNode.css('background-color');
    }, 
    /**
     * Updates the swatch position, based on the 
     * current options.
     */
    updateSwatchPosition: function () {
      var opts = this.opts,
        node = this.node,
        nodePosition = node.position(),
        pickerColorPosition = this.pickerColorNode.position(),
        margin = opts.swatchPositionMargin,
        swatch = this.swatch,
        swatchTop = 0,
        swatchLeft = 0;

      switch (opts.swatchPosition) {
        case 'top':
          swatchTop = nodePosition.top - swatch.innerHeight() - margin + pickerColorPosition.top;
          swatchLeft = nodePosition.left + pickerColorPosition.left;
          break;
        case 'right':
          swatchTop = nodePosition.top + pickerColorPosition.top;
          swatchLeft = nodePosition.left + node.width() + margin - pickerColorPosition.left;
          break;
        case 'bottom':
          swatchTop = nodePosition.top + node.height() + margin - pickerColorPosition.top;
          swatchLeft = nodePosition.left + pickerColorPosition.left;
          break;
        case 'left':
          swatchTop = nodePosition.top + pickerColorPosition.top;
          swatchLeft = nodePosition.left - swatch.innerWidth() - margin + pickerColorPosition.left;
          break;
      }

      swatch.css({
        top: swatchTop + 'px',
        left: swatchLeft + 'px'
      });
    },
    /**
     * Fires the change event, which calls all the 
     * registered listeners.
     * @param {string} color The new color
     */
    fireChangeEvent: function (color) {
      var observers = this.observers;
      for (var i=0, f=observers.length; i<f; i++) {
        observers[i](color);
      }
    },
    /**
     * Binds a callback function to the set color event.
     * @param {function} callback The callback function
     */
    change: function (callback) {
      this.observers.push(callback);
    },
    /**
     * Unbinds from the change event.
     */
    unbind: function (callback) {
      this.observers = $.grep(this.observers, function (value) {
        return value != callback;
      });
    }
  };

  /**
   * Copik default settings.
   */
  Copik.default = {
    activeColor: 'green',
    autoOpen: false,
    closeEffect: {
      animation: 'fade',
      duration: 'fast'
    },
    closeOnPick: true,
    colorSize: '20px',
    colorMargin: '2px',
    colors: [
      '#00CED1', '#00BFFF', '#BEBEBE',
      'gold', 'olive', 'purple',
      '66CDAA', '48D1CC', 'BC8F8F'
    ],
    linkedInput: null,
    openEffect: {
      animation: 'slide',
      duration: 'fast'
    },
    swatchColumns: 3,
    swatchPosition: 'bottom', // top, right, bottom or left
    swatchPositionMargin: 0
  };

  /**
   * Color names
   * http://en.wikipedia.org/wiki/X11_color_names
   */
  Copik.colorNames = {
    aqua: '00ffff',
    black: '000000',
    blue: '0000ff',
    fuchsia: 'ff00ff',
    gray: 'bebebe',
    green: '00ff00',
    gold: 'ffd700',
    maroon: 'b03060',
    navy: '000080',
    olive: '808000',
    purple: 'a020f0',
    'sky blue': '87ceeb',
    red: 'ff0000',
    teal: '008080',
    tomato: 'ff6347',
    white: 'ffffff',
    yellow: 'ffff00',
    'yellow green': '9acd32'
  };

}());