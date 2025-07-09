import React from 'react';
import Banner from './Banner/Banner';
import MarketNews from './MarketNews/MarketNews';

const Home = () => {
    return (
        <div className='mt-22 mb-20'>
           <Banner></Banner>
           <MarketNews></MarketNews>
        </div>
    );
};

export default Home;