import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

/*
Bütün sayfalar için bir header component
 */

class HeaderBar extends Component {

    doLogout = async () => {
        const url = "/api/logout";

        let response;

        try {
            response = await fetch(url, { method: "post" });
        } catch (err) {
            alert("Sunucuya bağlanmada hata: " + err);
            return;
        }

        if (response.status !== 204) {
            alert("Sunucuya bağlanmada hata: durum kodu " + response.status);
            return;
        }

        this.props.updateLoggedInUser(null);
        this.props.history.push("/");
    };

    renderLoggedIn(userId) {
        return (
            <React.Fragment>
                <p className="header-text">
                    Hoş geldin {userId}
                    !!!
                </p>
                <button className="header-button" onClick={this.doLogout}>
                    Logout
                </button>
            </React.Fragment>
        );
    }

    renderNotLoggedIn() {
        return (
            <React.Fragment>
                <p className="header-text">Giriş yapmadınız</p>
                <div className="action-buttons">
                    <Link className="header-button" to="/login" tabIndex="0">
                        Giriş Yap
                    </Link>
                    <Link className="header-button" to="/signup" tabIndex="0">
                        Üye Ol
                    </Link>
                </div>
            </React.Fragment>
        );
    }


    render() {
        const userId = this.props.userId;

        let content;
        if (!userId) {
            content = this.renderNotLoggedIn();
        } else {
            content = this.renderLoggedIn(userId);
        }
        return (
            <div className="header">
                <Link className="header-logo" to={"/"} tabIndex="0">
                Quiz
                </Link>
                {content}

            </div>
        );
    }
}

export default withRouter(HeaderBar);