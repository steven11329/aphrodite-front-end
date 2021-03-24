import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: ({ isMatchMinWidth }) => {
      console.log(isMatchMinWidth);
      return isMatchMinWidth ? '100%' : '60%';
    },
    height: '100vh',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const tileData = [
  {
    id: 2534,
    title: 'Re: [正妹] 比基尼 左邊右邊？',
    coverImage: null,
    createDate: '2021-03-20T11:14:04.000Z',
  },
  {
    id: 1257,
    title: '[正妹] 雙胞胎日女',
    coverImage: 'https://i.imgur.com/fTHopAo.jpg',
    createDate: '2021-03-16T23:29:58.000Z',
  },
  {
    id: 844,
    title: '[正妹]  舞蹈系品子',
    coverImage: 'https://i.imgur.com/iBS2nzh.jpg',
    createDate: '2021-03-16T05:35:33.000Z',
  },
  {
    id: 2119,
    title: '[正妹] 比基尼 左邊右邊？',
    coverImage: 'https://i.imgur.com/dybqhtb.jpg',
    createDate: '2021-03-20T08:09:52.000Z',
  },
  {
    id: 490,
    title: '[帥哥] 最帥分析師',
    coverImage: 'https://i.imgur.com/1dqOfER.jpg',
    createDate: '2021-03-12T12:07:56.000Z',
  },
  {
    id: 37,
    title: '[正妹] YOASOBI 幾田りら/ ikura',
    coverImage: 'https://i.imgur.com/RV5hkdy.jpg',
    createDate: '2021-03-10T12:19:23.000Z',
  },
  {
    id: 821,
    title: '[正妹] 25位 懷舊AV女優',
    coverImage: 'https://i.imgur.com/rZ5DmVX.jpg',
    createDate: '2021-03-05T04:31:57.000Z',
  },
  {
    id: 2498,
    title: '[正妹] 清大電機',
    coverImage: 'https://i.imgur.com/1mhDo4m.jpg',
    createDate: '2021-03-21T20:15:39.000Z',
  },
  {
    id: 455,
    title: '[正妹] 兇 瓦西列娃',
    coverImage: 'https://i.imgur.com/umArkvO.jpg',
    createDate: '2021-03-14T09:38:44.000Z',
  },
  {
    id: 23,
    title: '[正妹] 一黑一白糾纏在一起',
    coverImage: 'https://imgur.com/mbtV0ll.jpg',
    createDate: '2021-03-09T14:19:41.000Z',
  },
  {
    id: 2510,
    title: '[正妹] Joyce 慈妹',
    coverImage: 'https://i.imgur.com/Af8leKT.jpg',
    createDate: '2021-03-21T03:38:28.000Z',
  },
  {
    id: 1251,
    title: '[正妹] Angel',
    coverImage: 'https://i.imgur.com/W7w5SuG.jpg',
    createDate: '2021-03-18T09:05:51.000Z',
  },
  {
    id: 1266,
    title: '[正妹] 兇 台灣 雙胞胎',
    coverImage: 'https://i.imgur.com/qyirObB.jpg',
    createDate: '2021-03-17T09:19:40.000Z',
  },
  {
    id: 467,
    title: '[正妹] 姐姐妹妹',
    coverImage: 'https://i.imgur.com/BWoIREh.jpg',
    createDate: '2021-03-14T20:18:46.000Z',
  },
  {
    id: 477,
    title: '[帥哥] 席維斯‧史特龍',
    coverImage: 'https://i.imgur.com/fyR9gUB.jpg',
    createDate: '2021-03-13T18:05:21.000Z',
  },
  {
    id: 503,
    title: '[帥哥] 坤達',
    coverImage: 'https://i.imgur.com/Az77NA9.jpg',
    createDate: '2021-03-13T10:27:48.000Z',
  },
  {
    id: 9,
    title: '[正妹] 日本主播吃鳳梨',
    coverImage: 'https://i.imgur.com/fxR1vO9.jpg',
    createDate: '2021-03-10T23:48:08.000Z',
  },
  {
    id: 52,
    title: '[正妹] 綁頭髮',
    coverImage: 'https://m.imgur.com/KVHWgov.jpg',
    createDate: '2021-03-09T06:19:53.000Z',
  },
  {
    id: 90,
    title: '[正妹] 簡嫚書 最近感覺突破',
    coverImage: 'https://i.imgur.com/jtjpBUq.jpg',
    createDate: '2021-03-07T13:53:13.000Z',
  },
  {
    id: 83,
    title: '[正妹] 擊劍選手 文毅施',
    coverImage: 'https://i.imgur.com/9dibhzV.jpg',
    createDate: '2021-03-07T00:36:34.000Z',
  },
];

export default function Gallery() {
  const isMatchMaxWidth = useMediaQuery('(max-width: 500)');
  const classes = useStyles({ isMatchMaxWidth });

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tileData.map((tile, index) => (
          <GridListTile key={tile.id} cols={index % 5 === 0 ? 2 : 1}>
            {!tile.coverImage || tile.coverImage === '' ? (
              <Typography>沒有圖片</Typography>
            ) : (
              <img src={tile.coverImage} alt={tile.title} />
            )}
            <GridListTileBar
              title={tile.title}
              actionIcon={
                <IconButton
                  aria-label={`info about ${tile.title}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
