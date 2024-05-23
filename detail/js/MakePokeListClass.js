//モジュールを取得
import {GetPokeData} from "./GetPokeDataClass.js";

export class MakePokeListClass{
    constructor(addPage,startPage,limit){
        this.setAddPabe(addPage);
        this.setStartPage(startPage);
        this.setLimit(limit)
    }
    //Get
    getAddPage(){
        return this.addPage;
    }
    getStartPage(){
        return this.startPage;
    }
    getLimit(){
        return this.limit;
    }
    //set
    setAddPabe(addPage){
        this.addPage = addPage;
    }
    setStartPage(startPage){
        this.startPage = startPage;
    }
    setLimit(limit){
        this.limit = limit;
    }
    setAddLimit(addPage){
        this.limit += addPage;
    }

    async makeList(){
        let tmpAry = [];
        for(let i = this.getStartPage(); i <= this.getLimit(); i++){
            tmpAry.push(
                this.#makeIndexItem(i)
            )
        }
        const pokeList = await Promise.all(tmpAry);
        return pokeList;
    }
    async #makeIndexItem(num){
        const a = new GetPokeData(num);
        const img = a.getImg(await a.getVariInfo());
        const name = a.getName(await a.getGeneInfo());

        let text =
        `
            <li class="pokebex_item" id="${num}">
                <a href="detail/detail.html?number=${num}" class="detail_link" target="_blank">
                    <img class="pokebex_img" src="${img}" class="pokebex_icon">
                    <h1 class="pokebex_name">${name}</h1>
                </a>
            </li>
        `;
    return text;
    }
}