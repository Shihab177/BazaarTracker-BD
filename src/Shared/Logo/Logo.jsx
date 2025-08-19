import React from 'react';
import logo from '../../assets/logo.png'
const Logo = () => {
    return (
        <div>
            <img className=' h-8 md:h-10 xl:h-12 w-8 md:w-10 xl:w-12' src={logo} alt="" />
        </div>
    );
};

export default Logo;