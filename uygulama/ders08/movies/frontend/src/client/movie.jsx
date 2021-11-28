import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";

class Movie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            director: this.props.director ? this.props.director :"",
            title: this.props.title ? this.props.title:"",
            year: this.props.year ? this.props.year:""
        }
        this.ok = this.props.ok ? this.props.ok : "Ok";
    }

    onFormSubmit = async (event) => {
        event.preventDefault();

        const completed = await this.props.okCallback(
            this.state.director,
            this.state.title,
            this.state.year,
            this.props.movieId
        );

        if(completed){
            //adres satırı değişecek ve react-router re-render edecek
            this.props.history.push('/');
        }else {
            alert("Oluşturulurken hata");
        }
    }
    onChangeInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <div className="inputTitle">Yönetmen:</div>
                    <input placeholder={"Yönetmen adı"}
                           id="director"
                           onChange={this.onChangeInput}
                    value={this.state.director}
                    className="movieInput"
                    />
                    <div className="inputTitle">Film Adı:</div>
                    <input placeholder={"Film Adı"}
                           id="title"
                           onChange={this.onChangeInput}
                           value={this.state.title}
                           className="movieInput"
                    />
                    <div className="inputTitle">Yıl:</div>
                    <input placeholder={"Yıl"}
                           id="year"
                           onChange={this.onChangeInput}
                           value={this.state.year}
                           className="movieInput"
                    />

                    <button type="submit" className="btn">{this.ok}</button>
                    <Link to={"/"}><button className={"btn"}>Cancel</button></Link>

                </form>
            </div>
        );
    }
}

//this.props.history için gerekli bir High Order Component

export default withRouter(Movie);