import React, {Component} from 'react';

export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kediIndex: Math.floor(Math.random()*3),
            durum: undefined,
            kart: ["img/ArkaKapak.png","img/ArkaKapak.png","img/ArkaKapak.png"],
            kartSayac: 0,
            oyunSonlandi: false
        }
    }


    kediSec = (index) => {
        const { kart, kediIndex, kartSayac, oyunSonlandi } = this.state;

        if(!oyunSonlandi){
            const yeniKart = [...kart];
            let durum;

            if(kediIndex===index){
                yeniKart[index] = "img/Kedi.jpg";
                durum = "Kazandınız :)"
            }else {
                yeniKart[index] = "img/Kopek.jpg";
                if(kartSayac===1){
                    durum = "Kaybettiniz :("
                }
            }
            this.setState({
                kart:yeniKart,
                kartSayac: this.state.kartSayac+1,
                durum
            });

            if(durum){
                this.setState({
                    oyunSonlandi: true
                })
            }

        }
    }

    yeniOyun = () => {
        this.setState({
            kediIndex: Math.floor(Math.random()*3),
            durum: undefined,
            kart: ["img/ArkaKapak.png","img/ArkaKapak.png","img/ArkaKapak.png"],
            kartSayac: 0,
            oyunSonlandi: false
        })
    }

    render(){
        const { kart, durum } = this.state;
        return (
            <div>
                <p>Bu oyunda 3 kapalı kart içindeki kediyi bulman gerekmektedir. İlk tercihte Kedi kartını bulamaz isen
                    2. seçim hakkı tanınacaktır.</p>
                <img className="kart" src={kart[0]} onClick={()=>{this.kediSec(0)}}/>
                <img className="kart" src={kart[1]} onClick={()=>{this.kediSec(1)}}/>
                <img className="kart" src={kart[2]} onClick={()=>{this.kediSec(2)}}/>
                <div className="mesaj">
                    <p>{durum?durum:"Kedi kartını bulmak için kartın üzerine tıklamalısın."}</p>
                    {durum && <p>
                        Yeni bir oyun oynamak istersen <span onClick={this.yeniOyun} className='link'>buraya</span> tıklayabilirsin.
                    </p>}
                </div>
            </div>
        );
    }
}

