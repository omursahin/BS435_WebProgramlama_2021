const React = require('react');
const { mount } = require('enzyme');
const {Game} = require('../src/client/game');

test('kart sayısı',()=>{
    const driver = mount(<Game/>);

    const cards = driver.find('.kart')
    expect(cards.length).toBe(3);
})


test('tek kart secimi',()=>{
    const driver = mount(<Game/>);

    let card = driver.find('.kart').at(0);
    card.simulate('click');
    card = driver.find('.kart').at(0);
    let srcName = card.find("img").prop("src")
    expect(srcName === 'img/Kedi.jpg' || srcName === 'img/Kopek.jpg').toBeTruthy();
})

test('iki kart secimi ve yeniden baslatma',()=>{
    const driver = mount(<Game/>);

    for(let i = 0; i<20;i++){
    let card = driver.find('.kart').at(0);
    card.simulate('click');

    card = driver.find('.kart');
    if(card.length===3){
    //Eğer doğru kart bulunamadıysa. Kart doğru olsaydı length 1 olurdu.
    let secondSelected = Math.floor(Math.random()*2)
    card = driver.find('.kart').at(secondSelected+1);
    card.simulate('click');

    const kazandin = driver.html().includes("Kazandın");
    const kaybettin = driver.html().includes("Kaybettin");

    expect(kazandin === true || kaybettin === true).toBeTruthy()


    }
    let restart = driver.find('.play');
    restart.simulate('click');
    }

    })

test('Aynı karta tıklama',()=>{
   const driver = mount(<Game/>);

   for(let i =0;i<20 ; i++){
   let card = driver.find('.kart').at(0);
   card.simulate('click');
   const beforeHtml = driver.html();
   card = driver.find('.kart').at(0);
   card.simulate('click');
   const afterHtml = driver.html();

   expect(beforeHtml === afterHtml).toBeTruthy();
   }
})

