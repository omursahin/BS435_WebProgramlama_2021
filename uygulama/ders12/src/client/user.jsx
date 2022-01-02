import React from "react";
import {Link} from 'react-router-dom';


export class User extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            errorMsg: null
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {

        const id = new URLSearchParams(window.location.search).get("userId");

        if (!id) {
            this.setState({
                errorMsg: "Hata: Belirsiz user id",
                user: null
            });
            return;
        }

        const query = encodeURIComponent("{getUserById(id:\"" + id + "\"){id,name,middlename,surname,email}}");

        const url = "/graphql?query=" + query;

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            this.setState({
                errorMsg: "Kullanıcı bilgisi çekilirken hata: " + err,
                user: null
            });
            return;
        }

        if (response.status === 200) {

            if (payload.errors || !payload.data) {
                this.setState({
                    errorMsg: "İstekte bulunurken hata", user: null
                });
            } else {
                this.setState({
                    errorMsg: null, user: payload.data.getUserById
                });
            }

        } else {
            this.setState({
                errorMsg: "HTTP bağlantı hatası: durum kodu: " + response.status,
                user: null
            });
        }
    }

    render() {

        const error = this.state.errorMsg;
        if (error) {
            return (
                <p>
                    {error}
                </p>);
        }

        const user = this.state.user;

        if(! user){
            return(<h3>Yükleniyor...</h3>);
        }

        return (
            <div>
                <p>
                    <Link to={"/"}>Anasayfa</Link>
                </p>

                <h2>Kullanıcı Bilgileri</h2>

                <ul>
                    <li>Id: {user.id}</li>
                    <li>Ad: {user.name}</li>
                    <li>İkinci Ad: {user.middlename}</li>
                    <li>Soyad: {user.surname}</li>
                    <li>Email: {user.email}</li>
                </ul>
            </div>
        );
    }
}