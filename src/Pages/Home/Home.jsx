import React from 'react';
import Banner from './Banner/Banner';
import MarketNews from './MarketNews/MarketNews';
import TrendingProducts from './TrendingProducts/TrendingProducts';
import ProductSection from './ProductSection/ProductSection';
import AdvertisementHighlights from './AdvertisementHighlights/AdvertisementHighlights';

const Home = () => {
    return (
        <div className='mt-22 mb-20'>
           <Banner></Banner>
           <ProductSection></ProductSection>
           <AdvertisementHighlights></AdvertisementHighlights>
           <TrendingProducts></TrendingProducts>
            <MarketNews></MarketNews>
        </div>
    );
};

export default Home;