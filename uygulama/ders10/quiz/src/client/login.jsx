import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            password: "",
            errorMsg: null
        };
    }

    doLogIn = async () => {
        const { userId, password } = this.state;

        const url = "/api/login";

        const payload = { userId: userId, password: password };

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            this.setState({ errorMsg: "Sunucuya bağlanırken hata: " + err });
            return;
        }

        if (response.status === 401) {
            this.setState({ errorMsg: "Geçersiz kullanıcıId/şifre" });
            return;
        }

        if (response.status !== 204) {
            this.setState({
                errorMsg:
                    "Sunucuya bağlanırken hata: durum kodu " + response.status
            });
            return;
        }

        this.setState({ errorMsg: null });
        await this.props.fetchAndUpdateUserInfo();
        this.props.history.push("/");
    };

    onTextChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };

    render() {
        let error = <div></div>;
        if (this.state.errorMsg) {
            error = (
                <div className="errorMsg">
                    <p>{this.state.errorMsg}</p>
                </div>
            );
        }

        return (
            <div className="center">
                <div>
                    <p>Kullanıcı:</p>
                    <input
                        type="text"
                        value={this.state.userId}
                        id="userId"
                        onChange={this.onTextChange}
                    />
                </div>
                <div>
                    <p>Şifre:</p>
                    <input
                        type="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.onTextChange}
                    />
                </div>

                {error}

                <button className="button" onClick={this.doLogIn}>
                    Giriş
                </button>
                <Link className="button" tabIndex="0" to={"/signup"}>
                    Üye Ol
                </Link>
            </div>
        );
    }
}

export default withRouter(Login);