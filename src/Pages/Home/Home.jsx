import React from 'react';
import Banner from './Banner/Banner';
import MarketNews from './MarketNews/MarketNews';
import TrendingProducts from './TrendingProducts/TrendingProducts';
import ProductSection from './ProductSection/ProductSection';

const Home = () => {
    return (
        <div className='mt-22 mb-20'>
           <Banner></Banner>
           <ProductSection></ProductSection>
           <MarketNews></MarketNews>
           <TrendingProducts></TrendingProducts>
        </div>
    );
};

export default Home;