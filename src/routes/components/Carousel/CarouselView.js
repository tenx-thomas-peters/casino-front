import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import CorematContext from '../../../@jumbo/components/contextProvider/CorematContext';
import CmtCarousel from '../../../@coremat/CmtCarousel';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CarouselObject from "./CarouselObject";
import Button from "@material-ui/core/Button/Button";
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  itemRoot: {
    padding: 1,
    '& .Cmt-media-object': {
    },
    '& .Cmt-avatar': {
      height: 80,
      width: 80,
    },
    '& .Cmt-media-header': {
      marginBottom: 12,
    },
    '& .Cmt-media-image': {
      marginRight: 8,
    },
    '& .titleRoot': {
        fontSize: 32,
    }
  },
  titleRoot: {
    fontSize: 32,
  },
  descText: {
    fontSize: 28
  },
  detail_more_btn: {
      backgroundColor: '#f8b319',
      color: 'white',
      marginTop: '10px'
  }
}));

const CarouselView = () => {
  const classes = useStyles();
  const { dotPosition, dotStyle, settings } = useContext(CorematContext);
  const carouselData = [
      {
          title: 'BACCARAT',
          background_img: '/images/carousel/carousel.png',
          description: 'Slider Text',
      },
      {
          title: 'SLOT',
          background_img: '/images/carousel/carousel.png',
          description: 'Slider Text',
      },
      {
          title: 'CASINO',
          background_img: '/images/carousel/carousel.png',
          description: 'Slider Text',
      },
  ];

  const renderRow = (item, index) => {
    return (
      <Box key={index} className={classes.itemRoot}>
          <CarouselObject
              background_img={item.background_img}
              title={item.title}
              titleProps={{ className: classes.titleRoot }}>
              <Typography variant="body2" style={{fontSize: '24px'}}>
                  {item.description}
              </Typography>
              <Button className={clsx(classes.detail_more_btn, 'detail_more_btn')} variant="contained">detail more</Button>
          </CarouselObject>
      </Box>
    );
  };

  return (
    <CmtCarousel
      outline={dotStyle === 'outline'}
      color="#e2a70b"
      activeColor="#e2a70b"
      dotSize={12}
      settings={settings}
      data={carouselData}
      dotPosition={dotPosition}
      renderRow={renderRow}
    />
  );
};

export default CarouselView;
