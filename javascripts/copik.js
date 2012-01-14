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
    if (/[a-f0-9]{6}/.test(colorName)) { return '#' + colorName.replace(/#/, ''); }
    var colorVal = Copik.colorNames[colorName.toLowerCase()];
    if (!colorVal) { return null; }
    
  };

  /**
   * Creates a new instance of Copik.
   * If a selector is passes as the node, it will only use the first object in the resulting array
   * @param {object|selector} node The html node that will open up the swatch and display the active color.
   * @param {object} options The settings object
   */
  Copik = function (node, options) {
    this.opts = $.extend({}, Copik.default, options);
    this.node = $(node).eq(0);
    this.setup();
  };

  Copik.prototype = {
    /**
     * Setups copik instance
     */
    setup: function () {
      var opts = this.opts;
      this.colorNode = $('<span></span>')
        .css('background', getColorValue(opts.activeColor));
      this.node
        .addClass('copik')
        .attr('href', '#openSwatch')
        .append(this.colorNode);
      console.log(opts);
      console.log(opts.activeColor);
      console.log(getColorValue(opts.activeColor));
    }
  };

  /**
   * Copik default settings.
   */
  Copik.default = {
    activeColor: 'green',
    colorMargin: '2px',
    colorSize: '10px',
    swatchColumns: 5
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