import { LightningElement, api, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountClass.getAccounts';
import {MessageContext, publish} from 'lightning/messageService';
import message from '@salesforce/messageChannel/message__c';

export default class AccC2 extends LightningElement {

    @api searchTextChild2;

    @wire(MessageContext) messageContext;
    


    columns = [
        {label: 'Id', fieldName: 'Id'},
        {label: 'Name', fieldName: 'Name'},
        {label: 'Actions', fieldName: 'Actions', type:'button', typeAttributes:
        {
            label: 'View Contacts',
            value: 'view_contacts'
        }
        }

    ]



    rows = [
        {Id:'01', Name:'Prakrithi'},
        {Id:'02', Name:'Prakruthi'},
        {Id:'03', Name:'Prakruth'},
        {Id:'04', Name:'Prajapathi'}
    ]

    currentId;
    currentName;

    handleRowAction(event)
    {
        if(event.detail.action.value=='view_contacts')
        {
            this.currentId= event.detail.row.Id;
            this.currentName= event.detail.row.Name;


            const payload = {
                accountId:event.detail.row.Id,
                accountName:event.detail.row.Name
            };

            publish(this.messageContext,message , payload);


        }
    }

    @wire(getAccounts, {searchTextClass:'$searchTextChild2'}) accountRecords;

}
