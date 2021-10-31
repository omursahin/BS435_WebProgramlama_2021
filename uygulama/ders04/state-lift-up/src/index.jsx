import React from "react";
import ReactDOM from "react-dom";
import Container from "./container";

const App = () => {

    return(
        <div>
            <h2>State lift up</h2>
            <Container counternumber={3}/>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));