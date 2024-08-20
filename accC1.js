import { LightningElement } from 'lwc';
export default class AccC1 extends LightningElement {

    searchTextChild1;

    handleChange(event){
        this.searchTextChild1=event.target.value;

    }


    handleClick(event){
        const searchEvent = new CustomEvent('getsearchevent',{detail:this.searchTextChild1});
        this.dispatchEvent(searchEvent);
        
    }

}
