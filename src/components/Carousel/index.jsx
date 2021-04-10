/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useContext } from 'react';
import format from 'date-fns/format';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/icons/Link';
import Clear from '@material-ui/icons/Clear';
import FullScreen from '@material-ui/icons/Fullscreen';
import CarouselModalContext from '../../contexts/CarouselModalContext';
import Image from '../Image';
import Main from './Main';

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
      cursor: 'pointer',
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
    date: {
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
  const [data, setData] = useState(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const carouselModalContext = useContext(CarouselModalContext);

  useEffect(() => {
    async function loadData() {
      const postData = await getPost(carouselModalContext.postId);
      setData({ ...postData, createDate: new Date(postData.createDate) });
    }
    if (carouselModalContext.open) {
      loadData();
    }
  }, [carouselModalContext]);

  function left(e) {
    if (e) {
      e.stopPropagation();
    }
    setFocusIndex(focusIndex - 1);
  }

  function right(e) {
    if (e) {
      e.stopPropagation();
    }
    setFocusIndex(focusIndex + 1);
  }

  function close(e) {
    e.stopPropagation();
    setData(null);
    setFocusIndex(0);
    carouselModalContext.setCarouseModal({
      open: false,
      postId: null,
    });
  }

  function select(e, index) {
    e.stopPropagation();
    setFocusIndex(index);
  }

  const thumbnails = data?.imageUrlList.map((imageUrl, index) => (
    <div
      key={`thumbnail-${imageUrl}`}
      className={classes['thumbnail-image']}
      onClick={e => {
        select(e, index);
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
        <Main
          data={data}
          focusIndex={focusIndex}
          onClickPrevous={left}
          onClickNext={right}
        />
        <Grid
          className={classes.operations}
          container
          justify="center"
          alignItems="center"
          onClick={close}
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://${data?.link}`}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <IconButton color="primary" aria-label="link" component="span">
              <Link href={`https://${data?.link}`} />
            </IconButton>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={data?.imageUrlList[focusIndex]}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <IconButton color="primary" aria-label="link" component="span">
              <FullScreen />
            </IconButton>
          </a>
          <Typography variant="body2" className={classes.counter}>{`${
            focusIndex + 1
          } / ${
            data?.imageUrlList ? data.imageUrlList.length : 0
          }`}</Typography>
          <Typography variant="body2" className={classes.date}>
            {data?.createDate
              ? format(data.createDate, 'yyyy-MM-dd HH:mm:ss')
              : null}
          </Typography>
        </Grid>
        <Grid className={classes.thumbnail} onClick={close}>
          <span style={{ display: 'inline-flex' }}>{thumbnails}</span>
        </Grid>
      </div>
    </Modal>
  );
}

export default Carousel;
