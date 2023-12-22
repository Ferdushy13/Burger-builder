import React from "react";
import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import { Route, Routes } from 'react-router-dom';
import Checkout from "./Orders/Checkout/Checkout";
import Orders from "./Orders/Orders";

const Main = props => {
    return (
        <div>
            <Header />
            <div className="container">
                <Routes>
                    <Route path='/' element={<BurgerBuilder />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/checkout' element={<Checkout />} />
                </Routes>
            </div>

        </div>
    )
}

export default Main;