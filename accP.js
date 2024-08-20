import { LightningElement } from 'lwc';
export default class AccP extends LightningElement {

    searchTextParent=' ';
 
    handleEvent(event){
        this.searchTextParent = event.target.detail;
        
    }
     
   
}
