import React from "react";
import  ReactDOM from "react-dom";
import {Game} from "./game";

class App extends React.Component{

   render() {
       return(
           <div>
               <Game music="https://www.youtube.com/watch?v=rzD9eqB1Uvk" />
           </div>
       )
   }
}
ReactDOM.render(<App />, document.getElementById("root"));

