import omit from 'lodash/omit';
import React, { Component } from 'react';
import qs from 'query-string';
import PropTypes from 'prop-types';

class Img extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.initPlaceholderImage();
  }

  componentDidUpdate (oldProps) {
    this.initPlaceholderImage();
  }

  initPlaceholderImage () {
    if (!(typeof window != 'undefined' && window.document)) {
      return;
    }
    if (!this.props.usePlaceholder) {
      return;
    }

    const node = this.placeholder;

    // require in here to prevent errors during server-side rendering
    const Holder = require('holderjs');

    Holder.run({
      domain: 'holder.js',
      images: node,
      object: null,
      bgnodes: null,
      stylenodes: null,
    });
  }

  render() {
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
  }
}

Img.defaultProps = {
  usePlaceholder: false,
  placeholder: {
    /* See https://github.com/imsky/holder#placeholder-options for info on more props and themes */
    theme: 'vine',
    auto: true,
  },
};

Img.propTypes = {
  src: PropTypes.string.isRequired,
  usePlaceholder: PropTypes.bool,
  placeholder: PropTypes.object,
};

export default Img;
