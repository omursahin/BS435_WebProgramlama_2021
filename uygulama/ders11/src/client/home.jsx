import React, {Component} from 'react';
import {Link} from "react-router-dom";

export class Home extends Component {

    componentDidMount() {
        if (this.props.user) {
            /*
            Eğer kimliklendirme başarılı ise kullanıcının galibiyet ve yenilgi sayıları gibi bilgileri
            güncellememiz gerekmektedir.
             */
            this.props.fetchAndUpdateUserInfo();
        }
    }
    render() {
        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;

        return (
            <div>
                <h2>Quiz Oyunu</h2>
                <p className="welcome-text">
                    Quiz oyununa hoş geldiniz. Bu oyunda, 4 şıktan oluşan bir dizi soru soracağız.
                    Şıklardan yalnızca biri doğrudur. Eğer sorulardan birini yanlış cevaplarsan, yenilirsin!
                    Oyunu kazanmak istiyorsan tamamını doğru cevaplamak zorundasın :)
                </p>
                <p>Online oyuncu sayısı: {this.props.userCount}</p>

                {loggedIn ? (
                    <div>
                        <Link to={"/match"} className={"button"}>
                            Oyna
                        </Link>
                        <div className="action">
                            <p>Galibiyet: {user.victories}</p>
                            <p>Mağlubiyet: {user.defeats}</p>
                        </div>
                    </div>
                ) : (
                    <p>Oynamak için giriş yapmanız gerekmektedir!</p>
                )}
            </div>
        );
    }
}

