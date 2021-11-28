import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Home} from "./home";

import {NotFound} from "./not_found";
import Create from "./create";
import Edit from "./edit";

const App = () => {

    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/create" component={Create}/>
                    <Route exact path="/edit" component={Edit}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

ReactDOM.render(<App/>, document.getElementById("root"));