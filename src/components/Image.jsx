import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import ImgurTransformer from '../utils/ImgurTransformer';

const useStyles = makeStyles(
  () => ({
    block: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
  {
    name: 'Image',
  }
);

function Image({ className, src, alt, thumbnail }) {
  const classes = useStyles();
  const result = ImgurTransformer.transform(src, { thumbnail }) || src;
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (result) {
      setIsLoading(true);
      const image = new window.Image();
      image.onerror = () => {
        setIsError(true);
        setIsLoading(false);
      };
      image.onload = () => {
        setIsLoading(false);
      };
      image.src = result;
    }
  }, [result]);

  if (isLoading) {
    return (
      <div className={classes.block}>
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={classes.block}>
        <CancelPresentationIcon color="primary" fontSize="large" />
      </div>
    );
  }

  return <img className={classnames(className)} src={result} alt={alt} />;
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
