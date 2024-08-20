import {MessageContext, subscribe, unsubscribe} from 'lightning/messageService'
import { LightningElement , wire} from 'lwc';
import message from '@salesforce/messageChannel/message__c';
import getAccountContacts from '@salesforce/apex/AccountClass.getAccountContacts';

export default class ShowAccountContact extends LightningElement {

    subscription = null;
    @wire (MessageContext) messageContext;
    accountId;
    accountName;
    title = 'Contacts';
    contacts;

    connectedCallback() {
        this.handleSubscribe();
    }

    disconnectedCallback() {
        this.handleUnsubscribe();
    }

    handleSubscribe(){
        if(!this.subscription)
        {
            this.subscription = subscribe(this.messageContext, message,
                (parameter)=>
                {
                    this.accountId=parameter.accountId;
                    this.accountName=parameter.accountName;
                    this.title=this.accountName+"'s Contacts";
                    this.getContacts();
                }
                );
        }
    }

    async getContacts()
    {
        this.contacts= await getAccountContacts({accountId:this.accountId});
    }

    handleUnsubscribe(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }

}
