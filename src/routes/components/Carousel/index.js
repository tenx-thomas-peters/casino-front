import React from 'react';
import CarouselView from './CarouselView';
import CarouselContextProvider from './CarouselContextProvider';

const CasinoCarousel = () => {
    return (
        <CarouselContextProvider >
            <CarouselView />
        </CarouselContextProvider>
    );
};

export default CasinoCarousel;
