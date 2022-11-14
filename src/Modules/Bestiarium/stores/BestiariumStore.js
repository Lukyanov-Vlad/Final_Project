
import { makeAutoObservable,runInAction } from "mobx";

class BestiariumStore{

    mostersCategories= undefined;
    monstersCategoriesLoading=false
    monsterList=undefined;
    monstersByCategory=undefined;
    loadingMonsters=false;
    loadingMonstersByCategory=false;

    constructor(){
        makeAutoObservable(this,undefined,{
            autoBind:true,
        })
    }

    async loadMonsters(){
       
        this.loadingMonsters=true;
        try{
            const response=await fetch(`http://localhost:3001/monsters`);
            if(response.status>=400){
                throw new Error(`Response Error: ${response.statusText}`);
            }
            const data=await response.json();
            runInAction(()=>{
              
                this.monsterList=[...data];
                this.loadingMonsters=false;
            })
        }catch(err){
            console.log(err);
        }finally{
            this.loadingMonsters=false;
        }
       
    }
    
    loadMonstersByCategory(idCategory){
        if(this.monsterList){
            console.log('Запустили загрузку по категориям')
            this.loadingMonstersByCategory=true;
            const category=this.mostersCategories.find(({id})=>id===idCategory);
            const {name_moster_cats}=category;
            this.monstersByCategory=[...this.monsterList.filter(({moster_cats})=>moster_cats===name_moster_cats)];
            this.loadingMonstersByCategory=false;
            console.log(this.monstersByCategory)
        }
       
        
    }

    async loadMosterCategories(){
      
        this.monstersCategoriesLoading=true;
        try{
            const response=await fetch(`http://localhost:3001/monsters_category`);
            if(response.status>=400){
                throw new Error(`Response Error: ${response.statusText}`);
            }
            const data=await response.json();
            runInAction(()=>{
              
                this.mostersCategories=[...data];
                this.monstersCategoriesLoading=false;
            })
        }catch(err){
            console.log(err);
        }finally{
            this.monstersCategoriesLoading=false;
        }
       
    }




}

const bestiariumStore=new BestiariumStore();
export default bestiariumStore;