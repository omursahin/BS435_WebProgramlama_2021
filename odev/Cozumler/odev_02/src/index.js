let ilkSecim = null;
let oyunTamamlandi = true;
let kediIndeks= 0;

const indeksler = [0, 1, 2];

const kopekImg = "img/Kopek.jpg";
const kediImg = "img/Kedi.jpg";
const arkaKapakImg = "img/ArkaKapak.png";


export function yeniOyun(){

    ilkSecim = null;
    oyunTamamlandi = false;
    kediIndeks = Math.floor(Math.random() * 3);
    ilkMesajiGoster();
    arkaKapakGoster(0);
    arkaKapakGoster(1);
    arkaKapakGoster(2);
}

export function kartSec(index){

    if(oyunTamamlandi || index === ilkSecim){
        return;
    }
    if( kediIndeks === index ) {
        kediGoster(index);
        oyunuSonlandir(true);
    }
    else {
        if(!ilkSecim) {
            ilkSecim = index;
            kopekGoster(index);
        } else{
            oyunuSonlandir(false);
        }
    }
}

function kediGoster(index){
    const img = document.getElementById("img"+index);
    img.src = kediImg;
    img.style.cursor = "default";
}

function kopekGoster(index){
    const img = document.getElementById("img"+index);
    img.src = kopekImg;
    img.style.cursor = "default";
}

function oyunuSonlandir(kazandi){
    oyunTamamlandi = true;
    for(let i=0; i< indeksler.length; i++){
        if(i === kediIndeks){
            kediGoster(i);
        } else {
            kopekGoster(i);
        }
    }
    if(kazandi){
        kazandiGoster();
    }else {
        yenilgiGoster()
    }
}
function kazandiGoster(){
    hepsiniGizle();
    document.getElementById("kazandiId").style.display="block";
}

function yenilgiGoster(){
    hepsiniGizle();
    document.getElementById("yenildiId").style.display="block";
}
function ilkMesajiGoster(){
    hepsiniGizle();
    document.getElementById("ilkAlanId").style.display="block";
}

function hepsiniGizle(){
    document.getElementById("ilkAlanId").style.display="none";
    document.getElementById("kazandiId").style.display="none";
    document.getElementById("yenildiId").style.display="none";
}

function arkaKapakGoster(index) {
    const img = document.getElementById("img"+index);
    img.src = arkaKapakImg;
    img.style.cursor = "pointer";
}