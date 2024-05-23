//モジュールを取得
import {GetPokeData} from "./js/GetPokeDataClass.js";
import {GetPokeStatus} from "./js/GetPokeStatusClass.js";


//DOM取得
//header
const goHomeUrl = document.getElementById('goHomeUrl');
//概要
const num = document.getElementById('number');
const name = document.getElementById('name');
const img = document.getElementById('icon');
const genera = document.getElementById('genera');
const type = document.getElementById('type');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const abilities = document.getElementById('abilities');
const flavotext = document.getElementById('flavotext');

//ステータス
const hpMeter = document.getElementById("hp_meter");
const attackMeter = document.getElementById("attack_meter");
const defenseMeter = document.getElementById("defense_meter");
const specialAttackMeter = document.getElementById("specialAttack_meter");
const specialDefenseMeter = document.getElementById("specialDefense_meter");
const speedMeter = document.getElementById("speed-meter");
//パラメーター取得
const url = new URL(window.location.href);
const params = url.searchParams;
//パラメーターから値を取得
let number = params.get('number');

//不正な値の検出
async function setData(){
    try{
        //概要の取得
        const pokeData = new GetPokeData(number);
        const jaHrktPokeData = await pokeData.getJaHrktAllData();
        //ステータスの取得
        const getPokeStatus = new GetPokeStatus(number);
        const status = await getPokeStatus.getStatus()

        showDetail(jaHrktPokeData);
        showStatus(status);
    }catch{
        window.location.assign("http://127.0.0.1:5500/index.html");
    }
}

//DOM編集
function showDetail(jaHrktPokeData){
    num.innerText       = jaHrktPokeData.number;
    name.innerText      = jaHrktPokeData.name;
    img.src             = jaHrktPokeData.img;
    genera.innerText    = jaHrktPokeData.genera;
    type.innerText      = jaHrktPokeData.types;
    height.innerText    = jaHrktPokeData.physique.height + 'kg';
    weight.innerHTML    = jaHrktPokeData.physique.weight + 'm';
    abilities.innerText = jaHrktPokeData.abilities;
    flavotext.innerText = jaHrktPokeData.flavotext;
    
}

function showStatus(status){   
    hpMeter.value               = status.hp;
    attackMeter.value           = status.attack;
    defenseMeter.value          = status.defense;
    specialAttackMeter.value    = status.specialAttack;
    specialDefenseMeter.value   = status.specialDefense;
    speedMeter.value            = status.speed;
    
}

//発火
window.onload = await setData();