import React from 'react';
import Banner from './Banner/Banner';
import MarketNews from './MarketNews/MarketNews';
import TrendingProducts from './TrendingProducts/TrendingProducts';

const Home = () => {
    return (
        <div className='mt-22 mb-20'>
           <Banner></Banner>
           <MarketNews></MarketNews>
           <TrendingProducts></TrendingProducts>
        </div>
    );
};

export default Home;