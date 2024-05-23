import {PokeApiGateway} from "./PokeApiGatewayClass.js";

export class GetPokeStatus extends PokeApiGateway {

    //ステータスの取得
    async getStatus(){
        const varietiesData = await this.getVariInfo();
        const statsKeies = ["hp","attack","defense","specialAttack","specialDefense","speed"];
        const statsValues = varietiesData.stats;

        return this.#statsArrayCombine(statsKeies,statsValues);
    }

    //ステータスの値をパーセンテージにする
    #percentage(value){
        return (value / 2)  * 0.01
    }

    //key[]val[]の結合
    #statsArrayCombine(keys, values) {
        if (keys.length !== values.length) {
            throw new Error('Keys and values array must be of the same length');
        }
    
        return Object.fromEntries(keys.map((key, index) => [key, this.#percentage(values[index].base_stat)]));
    }
}