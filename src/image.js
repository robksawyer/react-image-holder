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

    const { usePlaceholder } = this.props;

    if (!usePlaceholder) {
      return;
    }

    // require in here to prevent errors during server-side rendering
    const Holder = require('holderjs');

    Holder.run({
      images: this.placeholderElement,
    });
  }

  render() {
    const { usePlaceholder, src, placeholder, width, height } = this.props;
    const attrs = omit(this.props, 'src', 'usePlaceholder', 'placeholder');

    // placeholder
    if (usePlaceholder) {
      const query = qs.stringify(placeholder);
      const src = `holder.js/${width}x${height}?${query}`;
      const placeholderAttrs = omit(attrs, 'width', 'height');

      return (
        <img {...placeholderAttrs}
          ref={(data) => { this.placeholderElement = data; }}
          data-src={src}
        />
      );
    }
    // real
    else {
      return (
        <img {...attrs} src={src} />
      );
    }
  }
}

Img.defaultProps = {
  src: '',
  usePlaceholder: false,
  placeholder: {
    /* See https://github.com/imsky/holder#placeholder-options for info on more props and themes */
    theme: 'vine',
    auto: true,
  },
};

Img.propTypes = {
  src: PropTypes.string,
  usePlaceholder: PropTypes.bool,
  placeholder: PropTypes.object,
};

export default Img;
