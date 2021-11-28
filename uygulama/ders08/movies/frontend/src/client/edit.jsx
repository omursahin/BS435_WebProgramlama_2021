import React, {Component} from 'react';
import Movie from "./movie";

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: null,
            error: null
        };

        this.movieId = new URLSearchParams(window.location.search).get("movieId");

        if(!this.movieId){
            this.state.error = "Geçersiz movie id";
        }
    }
    componentDidMount(){
        if(!this.state.error) {
            this.fetchMovie();
        }
    }
    fetchMovie = async () => {
        const url = "http://localhost:8081/movies/"+this.movieId;

        let response;
        let payload;

        try{
            response = await fetch(url);
            payload = await response.json();
        }catch (err) {
            //ağ hatası, yanlış url vs.
            this.setState({
                error: "HATA: film çekilemedi"+err,
                movie: null
            });
            return;
        }
        if(response.status===200){
            this.setState({
                error:null,
                movie:payload
            });
        } else {
            this.setState({
                error: "HTTP bağlantı hatası",
                movie: null
            })
        }
    }

    onOk = async (director,title,year,id) =>{
        const url = "http://localhost:8081/movies/"+id;

        const payload = {id,director,title,year};

        let response;

        try{
            response = await fetch(url,{
                method: "put",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        }catch (err){
            return false;
        }

        return response.status === 204;
    }

    render() {
        if(this.state.error){
            return(
                <div>
                    <p>Film düzenlenemez. {this.state.error}</p>
                </div>
            );
        }

        if(!this.state.movie){
            return(<p>Yükleniyor...</p>);
        }
        return (
            <div>
                <h3>Film Düzenle</h3>
                <Movie
                director={this.state.movie.director}
                title={this.state.movie.title}
                year={this.state.movie.year}
                movieId={this.movieId}
                ok={"Düzenle"}
                okCallback={this.onOk}/>
            </div>
        );
    }
}

export default Edit;