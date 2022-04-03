import React, { useState } from 'react';
import CorematContext from '../../../@jumbo/components/contextProvider/CorematContext';

const CarouselContextProvider = ({ children }) => {
  const [dotPosition, setDotPosition] = useState('top');
  const [dotStyle, setDotStyle] = useState('solid');

  const defaultSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    initialSlide: 0,
    swipeToSlide: true,
    vertical: false,
    verticalSwiping: false,
    adaptiveHeight: true,
    /*responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],*/
  };

  const [settings, setCarouselSettings] = useState(defaultSettings);

  return (
    <CorematContext.Provider
      value={{
        dotPosition,
        setDotPosition,
        dotStyle,
        setDotStyle,
        settings,
        setCarouselSettings,
      }}>
      {children}
    </CorematContext.Provider>
  );
};

export default CarouselContextProvider;
