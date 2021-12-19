import React, {Component} from 'react';

export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: null
        }
    }

    componentDidMount() {
        this.yeniOyun();
    }

    yeniOyun = () => {
        this.setState({
            game:{
                kediIndex: Math.floor(Math.random()*3),
                kazandi: false,
                kaybetti: false,
                kart: ["img/ArkaKapak.png","img/ArkaKapak.png","img/ArkaKapak.png"],
                kartSayac: 0
            }
        })
    }


    kediSec = (index) => {
        const { kart, kediIndex, kartSayac, kazandi, kaybetti } = this.state.game;

        if(kart[index]==="img/Kopek.jpg"){
            return;
        }

        if(!kazandi && !kaybetti){
            const yeniKart = [...kart];

            if(kediIndex===index){
                yeniKart[index] = "img/Kedi.jpg";
                this.setState({game:{kazandi: true,
                    kart:yeniKart}});
            }else {
                yeniKart[index] = "img/Kopek.jpg";
                if(kartSayac===1){
                    this.setState({game:{kaybetti: true,
                            kart:yeniKart}});
                }else {
                    this.setState(prev=>({game:{kartSayac:prev.game.kartSayac+1,
                            kart:yeniKart}}));
                }
            }

        }
    }


    render(){
        if(!this.state.game){
            return <h2>Yükleniyor...</h2>
        }
        const { game } = this.state;

        if(game.kazandi){
            return(
                <div className="game-result">
                    <h2>Kazandın!</h2>
                    <img className="kart" src='img/Kedi.jpg' />

                    <div className="action">
                        <button className="play new-game-button" onClick={this.yeniOyun}>Yeni Oyun</button>
                    </div>
                </div>
            )
        }
        if(game.kaybetti){
            return(
                <div className="game-result">
                    <h2>Kaybettin :( Kedi'yi seçmen gerekiyordu.</h2>
                    <div className="action">
                        <button className="play new-game-button" onClick={this.yeniOyun}>Yeni Oyun</button>
                    </div>
                </div>
            )
        }
        const kart = game.kart;
        const denemeText = (2-game.kartSayac)+" hakkınız kaldı."
        return (
            <div>
                <p>{denemeText}</p>
                <img className="kart" src={kart[0]} onClick={()=>{this.kediSec(0)}}/>
                <img className="kart" src={kart[1]} onClick={()=>{this.kediSec(1)}}/>
                <img className="kart" src={kart[2]} onClick={()=>{this.kediSec(2)}}/>
            </div>
        );
    }
}

