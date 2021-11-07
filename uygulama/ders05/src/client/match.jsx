import React from 'react';

import {getRandomQuizzes} from "./quizzes";

export class Match extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            match: null
        }
    }
    componentDidMount() {
        this.startNewMatch()
    }
    startNewMatch = () => {
        const quizzes = getRandomQuizzes(3);
        this.setState({
            match:{
                victory: false,
                defeat: false,
                quizzes,
                currentIndex: 0,
            }
        })
    }

    handleClick = (correct) => {
        const match = this.state.match;
        const quizzes = match.quizzes;
        if(correct){
         if(match.currentIndex === quizzes.length-1)
         {
             //son quiz çözülmüştür
             this.setState({
                 match: {victory:true}
             });
         }else {
             //sonraki quiz'e geçiş yap
             this.setState(prev=>({
                 match:{
                     currentIndex: prev.match.currentIndex + 1,
                     quizzes:prev.match.quizzes
                 }
             }))
         }
        }else{
            this.setState({match: {defeat: true}});
        }

    }
    renderAnswerTag(prefix,answer,correct) {
        return <div className="answer" onClick={()=>this.handleClick(correct)} tabIndex="0">{prefix+answer}</div>

    }
    render() {
        const match = this.state.match;

        if(!this.state.match){
            return <h2>Yükleniyor...</h2>
        }
        if(match.victory){
            return (
                <div className="game-result">
                    <h2>Kazandın!</h2>
                    <div className="action">
                        <button className="play new-game-button" onClick={this.startNewMatch}>Yeni Oyun</button>
                    </div>
                </div>
            );
        }

        if(match.defeat){
            return (
                <div className="game-result">
                    <h2>Yanlış cevap, kaybettin :(</h2>
                    <div className="action">
                        <button className="play new-game-button" onClick={this.startNewMatch}>Yeni Oyun</button>
                    </div>
                </div>
            );
        }

        const count = "" + (match.currentIndex+1) + "/" + match.quizzes.length;
        const quiz = match.quizzes[match.currentIndex];
        return(

                <div id={"quiz_" + quiz.id} className="quiz">
                <p className="question">Soru {count}: {quiz.question}</p>
                {this.renderAnswerTag("A: ",quiz.answers[0],quiz.indexOfRightAnswer===0)}
                {this.renderAnswerTag("B: ",quiz.answers[1],quiz.indexOfRightAnswer===1)}
                {this.renderAnswerTag("C: ",quiz.answers[2],quiz.indexOfRightAnswer===2)}
                {this.renderAnswerTag("D: ",quiz.answers[3],quiz.indexOfRightAnswer===3)}
                </div>)
    }
}
