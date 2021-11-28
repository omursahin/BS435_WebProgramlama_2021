import React, {Component} from 'react';
import Movie from "./movie";

class Create extends Component {

    onOk = async (director,title,year, movieId) => {
        const url = "http://localhost:8081/movies";

        //movieId eklenmiyor
        const payload = {director, title, year};
        let response;

        try{
            response = await fetch(url,{
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        }catch (err){
            return false;
        }

        return response.status === 201;
    }
    render() {
        return (
            <div>
                <h3>Yeni Film Oluştur</h3>
                <Movie director={""}
                       title={""}
                       year={""}
                       ok={"Oluştur"}
                       okCallback={this.onOk}
                />
            </div>
        );
    }
}

export default Create;