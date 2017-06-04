const _ = require('underscore');
const postcss = require('postcss');

/**
 *  Font Size parser
 *
 *  @author Alexandre Masy <hello@alexandremasy.com>
 **/
class fontSize
{
  /**
   *  The property
   *
   *  @return {String}
   **/
  get property() { return 'font-size'; }

  /**
   *  Set options
   *
   *  @param {Object} value
   **/
  set options(value) { this._options = value; }

  /**
   *  Process the value to output the appropriate replacement
   *
   *  @param {String} value
   **/
  process(value)
  {
    // get the def
    let r = new RegExp(`^(.*)\/(.*)$`)
    let m = value.match(r);

    let family = m[1];
    let size = m[2];

    // get the values
    let f = _.findWhere(this._options, {name:family});
    if (f)
    {
      size = f.sizes[size];
    }

    // apply the def to the template
    return this.apply({family, size});
  }

  /**
   *  Apply the given values to a template
   *
   *  @param {Object} def
   *  @return {Node}
   **/
  apply(def)
  {
    var tpl = `font-size: ${def.size}
    @media(<xs)
    {
      font-size: ${def.size[0]};
    }
    @media(>xs)
    {
      font-size: ${def.size[1]};
    }
    `;

    return postcss.parse(tpl);

    // return postcss.decl({ prop: 'font-size', value: def.size });
  }
}

module.exports = new fontSize();