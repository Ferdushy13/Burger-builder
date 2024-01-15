import React from "react";
import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import { Route, Switch } from 'react-router-dom';
import Checkout from "./Orders/Checkout/Checkout";
import Orders from "./Orders/Orders";
import Auth from "./Auth/Auth";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

const Main = props => {
    let routes = null;
    if (props.token === null) {
        routes = (<Switch>

            <Route path='/login' component={Auth} />

        </Switch>

        );
    } else {
        routes = (<Switch>
            <Route path='/' component={BurgerBuilder} />
            <Route path='/orders' component={Orders} />
            <Route path='/checkout' component={Checkout} /></Switch>
        )
    }
    return (
        <div>
            <Header />
            <div className="container">
                {routes}
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Main);