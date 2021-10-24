import React from "react";
import ReactDOM from "react-dom";

import {getRandomQuizzes} from "./quizzes";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            quiz: getRandomQuizzes(1)[0]
        }
    }

    componentDidMount() {
        console.log("component did mount")
    }
    componentWillUnmount() {
        console.log("component will unmount")

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate")
        if(prevState.quiz.question === this.state.quiz.question){
            console.log("Aynı soru");
            this.setState({
                quiz: getRandomQuizzes(1)[0]
            });
        }
    }

    handleClick = (correct) => {
        if(correct){
            alert("Doğru");
            this.setState({
                quiz:getRandomQuizzes(1)[0]
            });
        }else{
            alert("Yanlış");
        }

    }
    renderAnswerTag(prefix,answer,correct) {
        return <div className="answer" onClick={()=>this.handleClick(correct)}>{prefix+answer}</div>

    }
    render() {
        const quiz = this.state.quiz;
        return(
            <>
            <p className="question">Soru: {quiz.question}</p>
            {this.renderAnswerTag("A: ",quiz.answers[0],quiz.indexOfRightAnswer===0)}
            {this.renderAnswerTag("B: ",quiz.answers[1],quiz.indexOfRightAnswer===1)}
            {this.renderAnswerTag("C: ",quiz.answers[2],quiz.indexOfRightAnswer===2)}
            {this.renderAnswerTag("D: ",quiz.answers[3],quiz.indexOfRightAnswer===3)}
        </>)
    }
}
ReactDOM.render(<App music={"https://www.youtube.com/watch?v=xulvwfutChs"}/>, document.getElementById("root"));
