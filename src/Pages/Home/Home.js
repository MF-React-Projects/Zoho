import React from 'react';
import Banner from "./Banner";
import Products from "./Products";
import Reviews from "./Reviews";
import BusinessSummary from "./BusinessSummary";
import Blogs from "./Blogs";

const Home = () => {
    return (
        <div>
            <Banner/>
            <Products/>
            <Reviews/>
            <BusinessSummary/>
            <Blogs/>
        </div>
    );
};

export default Home;