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
  * **linkedInput** {string} A selector for an input field which gets updated after a color pick.
      Useful helper in forms.
  * **openEffect** {object} Sames as *closeEffect* but for the open action.
  * **swatchColumns** {number} The number of columns in the swatch.
  * **swatchPosition** {string} The position of the swatch in relation to the picker anchor.
      Possible values are _top_, _right_, _bottom_ and _left_.
  * **swatchPositionMargin** {number} The margin between the swatch and the picker anchor.

Color Names
-----------

Aliases to the color hexadecimal values can be added to the object _Copik.colorNames_.

    Copik.colorNames = {
      aqua: '00ffff',
      black: '000000',
      blue: '0000ff',
      fuchsia: 'ff00ff'
    };