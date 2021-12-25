import React from "react";
import { withRouter } from "react-router-dom";

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            password: "",
            confirm: "",
            errorMsg: null
        };
    }

    onTextChange = event => {
        this.setState({  [event.target.id]: event.target.value, errorMsg: null });
    };


    doSignUp = async () => {
        const { userId, password, confirm } = this.state;

        if (confirm !== password) {
            this.setState({ errorMsg: "Şifreler eşleşmemektedir" });
            return;
        }

        const url = "/api/signup";

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

        if (response.status === 400) {
            this.setState({ errorMsg: "Geçersiz kullanıcıId/şifre" });
            return;
        }

        if (response.status !== 201) {
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

    render() {
        let error = <div></div>;
        if (this.state.errorMsg) {
            error = (
                <div className="errorMsg">
                    <p>{this.state.errorMsg}</p>
                </div>
            );
        }

        let confirmMsg = "Ok";
        if (this.state.confirm !== this.state.password) {
            confirmMsg = "Eşleşmemektedir";
        }

        return (
            <div className="center">
                <div>
                    <p>Kullanıcı Id:</p>
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
                        value={this.state.password}
                        id="password"
                        onChange={this.onTextChange}
                    />
                </div>
                <div>
                    <p>Onay:</p>
                    <input
                        type="password"
                        value={this.state.confirm}
                        id="confirm"
                        onChange={this.onTextChange}
                    />
                    <div>{confirmMsg}</div>
                </div>

                {error}

                <button className="button" onClick={this.doSignUp}>
                    Üye Ol
                </button>
            </div>
        );
    }
}

export default withRouter(SignUp);
