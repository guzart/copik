Copik
=====

What?
-----

Shows a simple list of predefined colors, and lets the user choose one.

Usage
-------


  1. Copy _copik.js_ and _copik_ folder under stylesheets to your web site.
  1. Import them into your document using script and link tags.
  1. Add an anchor tag in your document.
    `<a id="myAnchorTag" href="#openSwatch"><span></span></a>`
  1. Create a _copik_ object using javascript.
    `var copikObj = new Copik('#myAnchorTag', options);`

Options
-------

  * **activeColor** {string} The initial color
  * **autoOpen** {bool} Indicates if the swatch window is open at startup.
  * **closeEffect** {object} The closing effect
      * **animation** {string} The closing animation (_fade_, _slide_ or _null_)
      * **duration** {string|number} The animation duration.
  * **closeOnPick** {bool} Indicates if the swatch should close after a color is picked.
  * **colorSize** {number} The size of the colors in the swatch (in pixels).
  * **colorMargin** {number} The margin between the swatch colors (in pixels).
  * **colors** {array} The array of colors in the swatch, the values should be a string 
      representing the hexadecimal color value with or without a hash sign.
      It can also be a color name, from the defined color names in Copik.colorNames.
  * **disabled** {bool} Indicates if the control is disabled at startup.
  * **linkedInput** {string} A selector for an input field which gets updated after a color pick.
      Useful helper in forms.
  * **openEffect** {object} Sames as *closeEffect* but for the open action.
  * **swatch** {string} The full path to the color array for the swatch.
  * **swatchColumns** {number} The number of columns in the swatch.
  * **swatchPosition** {string} The position of the swatch in relation to the picker anchor.
      Possible values are _top_, _right_, _bottom_ and _left_.
  * **swatchPositionMargin** {number} The margin between the swatch and the picker anchor.

Methods
-------

  * **open** Opens up the swatch panel
  * **close** Closes the swatch panel
  * **setColor(color)** Sets the color of the picker.
  * **getColor** {String} Returns the picked color.
  * **change(callback)** Binds a function to the change event _fn(color)_
  * **unbind(callback)** Unbinds the given function from the change events
  * **disable(isDisabled)** Disables or enables the control

Color Names
-----------

Aliases to the color hexadecimal values can be added to the object _Copik.colorNames_.

    Copik.colorNames = {
      aqua: '00ffff',
      black: '000000',
      blue: '0000ff',
      fuchsia: 'ff00ff'
    };

Color Swatches
--------------

Set some predefined swatches that you'll be able to reuse in several color pickers.

    Copik.Swatches.MySwatch = [
      'aqua', 'black', 'blue',
      '#ff0000', '0000ff', 'ff00ff'
    ];


Inline Html Options [Optional]
------------------------------

There's also the possibility to set some options directly from the html.
The Inline Html Options take precedence over the javascript object options.

  * **data-copik-color** The initial color (_activeColor_)
  * **data-copik-swatch** The color swatch to use. (ex 'Copik.Swatches.MySwatch')
  * **data-copik-swatch-position** The swatch display position.
  * **data-copik-input** The _linkedInput_ selector
  * **data-copik-disabled** Indicates if the controls is disabled at startup.

    <a id="myCopik" href="#openSwatch" 
      data-copik-color="#ff0000" 
      data-copik-swatch="Copik.Swatches.MySwatch"
      data-copik-swatch-position="right"
      data-copik-input="#myCopikInput"
      data-copik-disabled="true"></a>
