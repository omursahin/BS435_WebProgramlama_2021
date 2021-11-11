const React = require('react');
const { mount } = require('enzyme');
const {Game} = require('../src/game');

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

    card = driver.find('.kart').at(0);
    let secondSelected = Math.floor(Math.random()*2)
    let srcName = card.find("img").prop("src");
    if(srcName==='img/Kopek.jpg'){
        card = driver.find('.kart').at(secondSelected+1);
        card.simulate('click');

        card = driver.find('.kart').at(secondSelected+1);
        srcName = card.find("img").prop("src")
        expect(srcName === 'img/Kedi.jpg' || srcName === 'img/Kopek.jpg').toBeTruthy();
    }
    let restart = driver.find('.link');
    restart.simulate('click');
    }

})