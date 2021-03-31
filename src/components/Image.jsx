import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ImgurTransformer from '../utils/ImgurTransformer';

function Image({ className, src, alt, thumbnail }) {
  const result = ImgurTransformer.transform(src, { thumbnail });
  return (
    <img className={classnames(className)} src={result || src} alt={alt} />
  );
}

Image.defaultProps = {
  className: undefined,
  src: '',
  alt: undefined,
  thumbnail: false,
};

Image.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  src: PropTypes.string,
  alt: PropTypes.string,
  thumbnail: PropTypes.bool,
};

export default Image;
