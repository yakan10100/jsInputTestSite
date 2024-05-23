import {PokeApiGateway} from "./PokeApiGatewayClass.js";

export class GetPokeData extends PokeApiGateway{
    //名前の取得
    getName(generalData){
        const nameList = generalData.names;
        const jahrktLanguage = nameList.find((nameList) => nameList.language.name === "ja-Hrkt");
        return jahrktLanguage.name;
    }
    //画像の取得
    getImg(varietiesData){
        return varietiesData.sprites.other["official-artwork"].front_default;
    }
    //分類の取得
    getGenera(generalData){
        const generaList = generalData.genera;
        const jahrktLanguage = generaList.find((generaList) => generaList.language.name === "ja-Hrkt");
        return jahrktLanguage.genus;
    }
    //タイプの取得
    async getType(varietiesData){
        const enTypeNames = varietiesData.types.map((types)=>types.type.name);
        
        let jaHrktType = await Promise.all(enTypeNames.map(async (enTypeName)=>{
            const res = await fetch(`https://pokeapi.co/api/v2/type/${enTypeName}/`);
            const typeData = await res.json();
            
            const jaHrktType = typeData.names.find((typeName) => typeName.language.name === "ja-Hrkt");
            
            return jaHrktType.name;
        }));
        return jaHrktType;
    }
    //高さ、重さの取得
    getHeightAndWeight(varietiesData){
        let height = varietiesData.height * 10 / 100;
        let weight = varietiesData.weight * 10 / 100;
        return {'height':height,'weight':weight};
    }
    //特性の取得
    async getAbility(varietiesData){
        const haveNormalAbilityData = varietiesData.abilities.filter((ability)=>!ability.is_hidden);
        
        let jahrktAbilities = await Promise.all(haveNormalAbilityData.map(async (normalAbility)=>{
    
            const res = await fetch(normalAbility.ability.url);
            const abilityData = await res.json();
            
            const jaHrkt_Ability = abilityData.names.find((abilityName)=>abilityName.language.name === "ja-Hrkt");
            return jaHrkt_Ability.name;
        }));
    
        return jahrktAbilities;
    }
    //フレーバーテキストの取得
    //shield
    getFlavotext(generalData){
        const flavorTextEntries = generalData.flavor_text_entries;
        
        let jaHrktFlavorText = flavorTextEntries.find((flavorTextEntrie)=>{
            if(flavorTextEntrie.language.name === "ja-Hrkt" && flavorTextEntrie.version.name === "shield"){
                return flavorTextEntrie;
            }
        });
        if(!jaHrktFlavorText){
            jaHrktFlavorText = flavorTextEntries.find(flavorTextEntrie => flavorTextEntrie.language.name === "ja-Hrkt")
        }
        //編集
        
        jaHrktFlavorText.flavor_text = jaHrktFlavorText.flavor_text.replace(/\r?\n/g,"");
        return jaHrktFlavorText.flavor_text;
    }
    
    async getJaHrktAllData(){
        try{
            const generalData = await this.getGeneInfo()
            const varietiesData = await this.getVariInfo();
            const jaHrktAllData = {
                "number"    :   this.getNumber().padStart(4,'0'),
                "name"      :   this.getName(generalData),
                "img"       :   this.getImg(varietiesData),
                "genera"    :   this.getGenera(generalData),
                "types"     :   await this.getType(varietiesData),
                "physique"  :   this.getHeightAndWeight(varietiesData),
                "abilities" :   await this.getAbility(varietiesData),
                "flavotext" :   this.getFlavotext(generalData),
            }
            return jaHrktAllData;
            
        }catch(e){
            throw new Error('Insert another value');
        }
    }
}