import React, { useState, useEffect, useContext } from 'react';
import classnames from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Image from '../Image';
import getPosts from '../../apis/getPosts';
import CarouselModalContext from '../../contexts/CarouselModalContext';

const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      height: 'calc(100vh - 48px)',
      overflow: 'auto',
      padding: '16px 0',
      margin: '48px auto 0',
    },
    gridList: {
      width: '60%',
    },
    'gridList--fullWidth': {
      width: '100%',
    },
    tile: {
      cursor: 'pointer',
      transition: 'opacity 1s',
      '&:hover': {
        opacity: 0.3,
      },
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    loading: {
      height: 64,
      margin: '16px 0 0 0',
    },
  }),
  {
    name: 'Gallery',
  }
);

export default function Gallery() {
  const classes = useStyles();
  const carouselModalContext = useContext(CarouselModalContext);
  const isMatchMaxWidth = useMediaQuery('(max-width: 500px)');
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const [isReachBottom, setIsReachBottom] = useState(false);

  useEffect(() => {
    getPosts()
      .then(response => {
        setData(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isReachBottom === true && isLoading === false) {
      setIsLoading(true);
      getPosts(skip)
        .then(response => {
          setSkip(skip + 20);
          setData([...data, ...response]);
        })
        .finally(() => {
          setIsReachBottom(false);
          setIsLoading(false);
        });
    }
  }, [isReachBottom, isLoading, skip, data]);

  useEffect(() => {
    const el = document.getElementById('gallery');
    function onScroll() {
      if (el.clientHeight + el.scrollTop >= el.scrollHeight) {
        setIsReachBottom(true);
      }
    }
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div id="gallery" className={classnames(classes.root)}>
      <GridList
        cellHeight={isMatchMaxWidth ? 160 : 300}
        className={classnames(classes.gridList, {
          [classes['gridList--fullWidth']]: isMatchMaxWidth,
        })}
        cols={3}
      >
        {data.map((tile, index) => (
          <GridListTile
            key={tile.id}
            cols={index % 4 === 0 || index % 4 === 3 ? 2 : 1}
            className={classes.tile}
            onClick={() => {
              carouselModalContext.setCarouseModal({
                open: true,
                postId: tile.id,
              });
            }}
          >
            {!tile.coverImage || tile.coverImage === '' ? (
              <Typography>沒有圖片</Typography>
            ) : (
              <Image
                className={classes.image}
                src={tile.coverImage}
                alt={tile.title}
                thumbnail={window.isMobileBrowser}
              />
            )}
            <GridListTileBar
              title={<span title={tile.title}>{tile.title}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
      <Grid
        className={classes.loading}
        item
        xs={12}
        container
        justify="center"
        alignItems="center"
      >
        {isLoading && <CircularProgress />}
      </Grid>
    </div>
  );
}
