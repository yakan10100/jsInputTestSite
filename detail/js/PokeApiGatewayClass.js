export class PokeApiGateway {
    constructor(number){
        this.number = number;

        this.GeneInfo = async () =>{
            const GeneralUrl = `https://pokeapi.co/api/v2/pokemon-species/${this.getNumber()}/`;
            const resJson = (await fetch(GeneralUrl)).json();
            return resJson;
        }
        this.variInfo = async () =>{
            const varietiesUrl = `https://pokeapi.co/api/v2/pokemon/${this.getNumber()}/`;
            const resJson = (await fetch(varietiesUrl)).json();
            return resJson;
        }
    }

    //GET
    //private
    getGeneInfo(){
        return this.GeneInfo();
    }
    getVariInfo(){
        return this.variInfo();
    }
    getNumber(){
        return this.number;
    }
    //SET
    #setNumber(number){
        this.number = number;
    }
}