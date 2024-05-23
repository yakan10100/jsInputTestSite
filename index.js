import { MakePokeListClass } from "./detail/js/MakePokeListClass.js";
//グローバル
const addPage = 32;
const startPage = 1;
const limit = 32;

const makeList = new MakePokeListClass(addPage,startPage,limit);

//処理
document.addEventListener('DOMContentLoaded',() => {
    const pokebexList = document.getElementById('pokebex_list');
    const loader = document.getElementById('loader');

    
    const loadMoreItems = async () => {
        loader.style.display = 'block';
        try {
            //html形式の取得
            const pokeList = await makeList.makeList();
            //出力
            pokeList.forEach(item => {
                pokebexList.innerHTML += item;
            });
            
            makeList.setStartPage(makeList.getLimit() + 1);
            makeList.setAddLimit(addPage);
            //-------------------------
        } catch (error) {
            console.error('Error loading items:', error);
        } finally {
            loader.style.display = 'none';
        }
    };

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            loadMoreItems();
        }
    };

    window.addEventListener('scroll', handleScroll);
    loadMoreItems(); // 初期ロード
});