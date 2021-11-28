import React from "react";
import {Link} from 'react-router-dom';


export class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: null,
            error: null
        }
    }

    componentDidMount() {
        this.fetchMovies()
    }

    fetchMovies = async () =>{
        const url = "http://localhost:8081/movies";

        let response;
        let payload;

        try{
            response = await fetch(url);
            payload = await response.json();
        }catch (err){
            this.setState({
                error: "Liste çekerken hata meydana geldi: "+err,
                movies: null
            });
            return;
        }
        if(response.status ===200){
            this.setState({
                error: null,
                movies: payload
            });
        }else {
            this.setState({
                error: "HTTP bağlantı problemi",
                movies: null
            });
        }
    }
    deleteMovie = async (id) => {
        const url = "http://localhost:8081/movies/"+id;

        let response;
        try{
            response = await fetch(url,{method: "delete"});

        }catch (err) {
            alert("Delete hata ile karşılaştı"+err);
            return false;
        }
        if(response.status !== 204){
            alert("Delete hata ile karşılaştı, durum kodu:"+response.status);
            return false;
        }
        await this.fetchMovies();
        return true;
    }
    render() {
        let table;

        if(this.state.error) {
            table = <p>{this.state.error}</p>
        } else if(!this.state.movies || this.state.movies.length ===0 ){
            table = <p>Veritabanında kayıtlı tablo bulunmamaktadır.</p>
        } else {
            table = <div>
                <table className="allMovies">
                <thead>
                <tr>
                    <th>Yönetmen</th>
                    <th>Başlık</th>
                    <th>Yıl</th>
                    <th>Seçenekler</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.movies.map(m=>
                    <tr key={"key_"+m.id} className="oneMovie">
                        <td>{m.director}</td>
                        <td>{m.title}</td>
                        <td>{m.year}</td>
                        <td>
                            <Link to={"/edit?movieId="+m.id}>
                                <button className="btn">
                                    <i className="fas fa-edit"></i>
                                </button>
                            </Link>
                            <button className="btn" onClick={()=>this.deleteMovie(m.id)}>
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                    )
                }
                </tbody>
                </table>
            </div>
        }

      return (
            <div>
                <h2>Movie List</h2>
                <Link to={"/create"}>
                    <button className="btn">New</button>
                </Link>
                {table}
            </div>
        );
    }
}