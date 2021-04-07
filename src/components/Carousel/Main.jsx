/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Image from '../Image';

const useStyles = makeStyles(
  () => ({
    main: {
      position: 'relative',
      width: '100%',
      height: 'calc(100vh - 48px - 48px - 180px)',
    },
    container: {
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      transition: 'transform .5s ease-out',
    },
    'container--smooth': {
      transition: 'transform .5s ease-out',
    },
    image: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      minWidth: '100%',
      height: '100%',
      pointerEvents: 'none',
      '& > img': {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
      },
    },
    'slide-button--left': {
      position: 'absolute',
      top: '50%',
      left: 0,
      zIndex: 1,
      transform: 'translateY(-50%)',
    },
    'slide-button--right': {
      position: 'absolute',
      top: '50%',
      right: 0,
      zIndex: 1,
      transform: 'translateY(-50%)',
    },
  }),
  {
    name: 'CarouselMain',
  }
);

function Main({ data, focusIndex, onClickPrevous, onClickNext }) {
  const classes = useStyles();
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const element = document.getElementById('carousel-container');
    let x0 = null;
    let locked = false;

    function unify(e) {
      return e.changedTouches ? e.changedTouches[0] : e;
    }

    function lock(e) {
      x0 = unify(e).clientX;
      locked = true;
    }

    function drag(e) {
      e.preventDefault();

      if (locked) {
        element.style.setProperty(
          '--tx',
          `${Math.round(unify(e).clientX - x0)}px`
        );
      }
    }

    function move(e) {
      if (locked) {
        const dx = unify(e).clientX - x0;
        const sign = Math.sign(dx);
        const distance = +((sign * dx) / element.clientWidth).toFixed(2);
        if (distance > 0.2) {
          setDirection(sign);
        }
        element.style.setProperty('--tx', '0px');
        locked = false;
        x0 = null;
      }
    }

    element.addEventListener('mousedown', lock, false);
    element.addEventListener('touchstart', lock, false);
    element.addEventListener('mouseup', move, false);
    element.addEventListener('touchend', move, false);
    element.addEventListener('mousemove', drag, false);
    element.addEventListener('touchmove', drag, false);

    return () => {
      element.removeEventListener('mousedown', lock);
      element.removeEventListener('touchstart', lock);
      element.removeEventListener('mouseup', move);
      element.removeEventListener('touchend', move);
      element.removeEventListener('mousemove', drag);
      element.removeEventListener('touchmove', drag);
    };
  }, [classes]);

  useEffect(() => {
    if (direction !== 0) {
      setDirection(0);
      if (direction > 0 && focusIndex > 0) {
        onClickPrevous();
      } else if (direction < 0 && focusIndex < data.imageUrlList.length - 1) {
        onClickNext();
      }
    }
  }, [direction, data, focusIndex, onClickPrevous, onClickNext]);

  const images = data?.imageUrlList.map((imageUrl, index) => (
    <div key={`image-${imageUrl}`} className={classes.image}>
      <Image src={imageUrl} alt={`${data.title}-${index}}`} />
    </div>
  ));

  return (
    <div id="carousel-container" className={classes.main}>
      <IconButton
        className={classes['slide-button--left']}
        color="primary"
        aria-label="previous"
        component="span"
        onClick={onClickPrevous}
        disabled={focusIndex === 0}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Grid
        className={classes.container}
        container
        justify="space-between"
        alignItems="center"
        wrap="nowrap"
        style={{
          transform: `translate(calc(-1 * ${focusIndex} * 100% + var(--tx, 0px)))`,
        }}
      >
        {images}
      </Grid>
      <IconButton
        className={classes['slide-button--right']}
        color="primary"
        aria-label="next"
        component="span"
        onClick={onClickNext}
        disabled={
          data?.imageUrlList
            ? focusIndex === data.imageUrlList.length - 1
            : true
        }
      >
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
}

Main.defaultProps = {
  data: {
    title: '',
    imageUrlList: [],
  },
};

Main.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    imageUrlList: PropTypes.arrayOf(PropTypes.string),
  }),
  focusIndex: PropTypes.number.isRequired,
  onClickPrevous: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
};

export default Main;
