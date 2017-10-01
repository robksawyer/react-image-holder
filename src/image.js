var omit = require('lodash/omit'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    qs = require('query-string');
    PropTypes = require('prop-types');


var DEFAULT_PROPS = {
  usePlaceholder: false,
  placeholder: {
    /* See https://github.com/imsky/holder#placeholder-options for info on more props and themes */
    theme: 'vine',
    auto: true,
  },
};


var Img = React.createClass({

  placeholder: null,

  getDefaultProps: function() {
    return DEFAULT_PROPS;
  },

  render: function() {
    let props = this.props;

    let { width, height } = this.props;

    let attrs = omit(props, 'src', 'usePlaceholder', 'placeholder');

    // placeholder
    if (props.usePlaceholder) {
      let query = qs.stringify(props.placeholder);

      let src = `holder.js/${width}x${height}?${query}`;

      let placeholderAttrs = omit(attrs, 'width', 'height');

      return (
        <img {...placeholderAttrs} ref={function(data) {
          this.placeholder = data;
        }} data-src={src} />
      );
    }
    // real
    else {
      return (
        <img {...attrs} src={props.src} />
      );
    }
  },

  componentDidMount: function() {
    this._initPlaceholderImage();
  },


  componentDidUpdate: function(oldProps) {
    this._initPlaceholderImage();
  },


  _initPlaceholderImage: function() {
    if (!(typeof window != 'undefined' && window.document)) {
      return;
    }
    if (!this.props.usePlaceholder) {
      return;
    }

    // let node = ReactDOM.findDOMNode(this.refs.placeholder);
    let node = this.placeholder;

    // require in here to prevent errors during server-side rendering
    let Holder = require('holderjs');

    Holder.run({
      domain: 'holder.js',
      images: node,
      object: null,
      bgnodes: null,
      stylenodes: null,
    });
  },

});

Img.propTypes = {
  src: PropTypes.string.isRequired,
  usePlaceholder: PropTypes.bool,
  placeholder: PropTypes.object,
};


// make
Img.DEFAULT_PROPS = DEFAULT_PROPS;


module.exports = Img;
