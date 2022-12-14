import { makeAutoObservable, runInAction } from "mobx";

export class PersonStore {

    person = {};
    loadingPersonStatus = false;

    constructor() {
        makeAutoObservable(this, undefined, {
            autoBind: true,
        })
    }

    async loadPerson(id) {

        this.loadingPersonStatus = true;
        try {
            const response = await fetch(`http://localhost:3001/pers/${id}`);
            if (response.status >= 400) {
                throw new Error(`Response Error: ${response.statusText}`);
            }
            const data = await response.json();
            runInAction(() => {

                this.person = { ...data };
                this.loadingPersonStatus = false;
            })
        } catch (err) {
            console.log(err);
        } finally {
            runInAction(() => {
                this.loadingPersonStatus = false;
            })

        }

    }



}

// const productStore=new ProductStore();
// export default productStore;