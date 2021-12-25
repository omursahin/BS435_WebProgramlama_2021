import React, {Component} from 'react';

import ReactDOM from "react-dom";

import {Home} from "./home";
import {BrowserRouter, HashRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import HeaderBar from "./headerbar";
import Login from "./login";
import SignUp from "./signup";
import Match from "./match";


class App extends Component {

    constructor(props) {
        super(props);

        /*
            Giriş yapıp yapmama durumuna göre render edilecek kısımları bu değişkene göre belirliyoruz.
            Eğer kullanıcı giriş yaparsa veriler bu state'de tutulur.
            Eğer değeri null ise kullanıcı giriş yapmamıştır.
         */

        this.state = {
            user: null,
            userCount: 1
        };
    }

    /*
    Giriş yapıp yapmamamız, oturum tanımlama bilgisine bağlıdır.
    Her HTTP isteğinde sunucuya gönderilen budur.
    Bu bilgi eksikse, 401 durum kodu hatası alacağız.
    Sayfayı tarayıcıdan manuel olarak yenilediğimiz zaman geçerli bir cookie değeri olmasına rağmen yeni state ile yeniden bağlanacaktır
    (ve bu nedenle userId boştur). Sunucuya bir AJAX çağrısı yaparak eğer geçerli bir oturum varsa userId'yi tekrar doldurmak gerekir.     */

    fetchAndUpdateUserInfo = async () => {

        const url = "/api/user";

        let response;

        try {
            response = await fetch(url);
        } catch (err) {
            this.setState({errorMsg: "Sunucu bağlantısında hata: " + err});
            return;
        }

        if (response.status === 401) {
            this.updateLoggedInUser(null);
            return;
        }

        if (response.status !== 200) {
            //TODO sayfada çeşitli uyarılar gösterilebilir.
        } else {
            const payload = await response.json();
            this.updateLoggedInUser(payload);
        }
    };

    updateLoggedInUser = (user) => {
        this.setState({user: user});
    };
    componentDidMount() {
        this.fetchAndUpdateUserInfo();
        let protocol = "ws:";
        if (window.location.protocol.toLowerCase() === "https:") {
            protocol = "wss:";
        }

        this.socket = new WebSocket(protocol + "//" + window.location.host);

        this.socket.onmessage = (event) => {
            const dto = JSON.parse(event.data);

            if (!dto || !dto.userCount) {
                this.setState({ userCount: "ERROR" });
                return;
            }

            this.setState({ userCount: dto.userCount });
        };

    }
    componentWillUnmount() {
        this.socket.close();
    }
    notFound = () => {
        return (
            <div>
                <h2>Sayfa Bulunamadı: 404</h2>
                <p>
                    Hata: Aradığınız sayfaya şu anda ulaşılamıyor.
                    Lütfen daha sonra tekrar deneyiniz.
                </p>
            </div>
        )
    }

    render() {
        /*
            Sadece switch kullanacak isek Component'ler işe yarayacaktır
            ancak props göndermek istediğimizde render özelliğini kullanmalıyız.
         */
        const id = this.state.user ? this.state.user.id : null;

        return (
            <HashRouter>
                <div>
                    <HeaderBar userId={id}
                               updateLoggedInUser={this.updateLoggedInUser}/>
                    <Switch>
                        <Route exact path="/match"
                               render={props => <Match {...props}
                                                       user={this.state.user}
                                                       updateLoggedInUser={this.updateLoggedInUser}
                                                       fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}
                               />}/>
                        <Route exact path="/login"
                               render={props => <Login {...props}
                                                       fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>
                        <Route exact path="/signup"
                               render={props => <SignUp {...props}
                                                        fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>
                        <Route exact path="/"
                               render={props => <Home {...props}
                                                      user={this.state.user}
                                                      userCount={this.state.userCount}
                                                      fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>
                        <Route component={this.notFound}/>
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}



ReactDOM.render(<App />, document.getElementById("root"));

