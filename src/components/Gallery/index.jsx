import React, { useState, useEffect, useContext } from 'react';
import classnames from 'classnames';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
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
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import getLastUpdate from '../../apis/getLastUpdate';

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
    'update-date': {
      width: '60%',
      textAlign: 'end',
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
  const [isReachBottom, setIsReachBottom] = useInfiniteScroll('gallery');
  const [lastUpdate, setLastUpdate] = useState('N/A');

  useEffect(() => {
    getPosts()
      .then(response => {
        setData(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
    getLastUpdate(1).then(response => {
      if (response) {
        setLastUpdate(format(new Date(response), 'PP pp', { locale: zhTW }));
      }
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
  }, [isReachBottom, setIsReachBottom, isLoading, skip, data]);

  return (
    <div id="gallery" className={classnames(classes.root)}>
      <p className={classes['update-date']}>上次更新時間：{lastUpdate}</p>
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
            <GridListTileBar title={tile.title} aria-label="Article Title" />
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
