/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import classnames from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Link from '@material-ui/icons/Link';
import Clear from '@material-ui/icons/Clear';
import FullScreen from '@material-ui/icons/Fullscreen';
import CarouselModalContext from '../../contexts/CarouselModalContext';
import Image from '../Image';

import getPost from '../../apis/getPost';

const useStyles = makeStyles(
  () => ({
    title: {
      position: 'relative',
      height: 48,
      color: 'white',
      backgroundColor: 'black',
    },
    'close-button': {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    main: {
      position: 'relative',
      height: 'calc(100vh - 48px - 48px - 180px)',
    },
    image: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '60%',
      height: '100%',
      transform: 'translateX(-50%)',
      transition: 'left 1s',
      '& > img': {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
      },
    },
    'image-fullWidth': {
      width: '100%',
    },
    operations: {
      height: 48,
      backgroundColor: 'black',
    },
    thumbnail: {
      width: '100vw',
      height: 180,
      backgroundColor: 'black',
      overflow: 'auto',
      padding: '0 4px',
    },
    'thumbnail-image': {
      display: 'inline-block',
      width: 160,
      height: 160,
      border: '1px solid white',
      margin: '0 4px',
      '& > img': {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
    },
    counter: {
      color: 'white',
      padding: 12,
    },
  }),
  {
    name: 'Carousel',
  }
);

function Carousel() {
  const classes = useStyles();
  const isMatchMaxWidth = useMediaQuery('(max-width: 500px)');
  const [data, setData] = useState(null);
  const [forcus, setFocus] = useState(0);
  const carouselModalContext = useContext(CarouselModalContext);

  useEffect(() => {
    async function loadData() {
      const postData = await getPost(carouselModalContext.postId);
      setData(postData);
    }
    if (carouselModalContext.open) {
      loadData();
    }
  }, [carouselModalContext]);

  function left() {
    setFocus(forcus - 1);
  }

  function right() {
    setFocus(forcus + 1);
  }

  function close() {
    setFocus(0);
    carouselModalContext.setCarouseModal({
      open: false,
      postId: null,
    });
  }

  function select(index) {
    setFocus(index);
  }

  const images = data?.imageUrlList.map((imageUrl, index) => (
    <div
      key={`image-${imageUrl}`}
      className={classnames(classes.image, {
        [classes['image-fullWidth']]: isMatchMaxWidth,
      })}
      style={{ left: `calc(100vw * ${index - forcus} + 50%)` }}
    >
      <img src={imageUrl} alt={`${data.title}-${index}}`} />
    </div>
  ));

  const thumbnails = data?.imageUrlList.map((imageUrl, index) => (
    <div
      key={`thumbnail-${imageUrl}`}
      className={classes['thumbnail-image']}
      onClick={() => {
        select(index);
      }}
    >
      <Image
        src={imageUrl}
        alt={`thumbnail-${data.title}-${index}}`}
        thumbnail
      />
    </div>
  ));

  return (
    <Modal open={carouselModalContext.open}>
      <div>
        <Grid
          className={classes.title}
          justify="center"
          alignItems="center"
          container
        >
          <Typography variant="h6">{data?.title}</Typography>
          <IconButton
            className={classes['close-button']}
            color="primary"
            aria-label="close"
            component="span"
            onClick={close}
          >
            <Clear />
          </IconButton>
        </Grid>
        <Grid
          className={classes.main}
          container
          justify="space-between"
          alignItems="center"
        >
          {images}
          <IconButton
            color="primary"
            aria-label="previous"
            component="span"
            onClick={left}
            disabled={forcus === 0}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="next"
            component="span"
            onClick={right}
            disabled={
              data?.imageUrlList
                ? forcus === data.imageUrlList.length - 1
                : true
            }
          >
            <ChevronRightIcon />
          </IconButton>
        </Grid>
        <Grid
          className={classes.operations}
          container
          justify="center"
          alignItems="center"
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://${data?.link}`}
          >
            <IconButton color="primary" aria-label="link" component="span">
              <Link href={`https://${data?.link}`} />
            </IconButton>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={data?.imageUrlList[forcus]}
          >
            <IconButton color="primary" aria-label="link" component="span">
              <FullScreen />
            </IconButton>
          </a>
          <Typography variant="body2" className={classes.counter}>{`${
            forcus + 1
          } / ${
            data?.imageUrlList ? data.imageUrlList.length : 0
          }`}</Typography>
        </Grid>
        <div className={classes.thumbnail}>
          <span style={{ display: 'inline-flex' }}>{thumbnails}</span>
        </div>
      </div>
    </Modal>
  );
}

export default Carousel;
