import {Page, NavController, NavParams} from 'ionic-angular';
import {DatabaseService} from '../../../services/database.ts';
import {Models} from '../../../dataLists/dataModels.ts';
import {lists} from '../../../dataLists/dropDownLists.ts';
const localforage = require('localforage');

@Page({
    templateUrl: 'build/pages/tabs/partD/partD.html'
})

export class PartDPage {

    private navStack;
    private navParams;
    private partDId;
    private partD;
    private partDStore;

    public situationList = lists.panelSituationList;

    constructor(nav: NavController, navParams: NavParams){
        this.navStack = nav;
        this.navParams = navParams;

        //This JSON trick clones the object
        this.partD = JSON.parse(JSON.stringify(Models.partD));
        this.partD.parentId = this.navParams.get('siteId');

        this.partDStore = localforage.createInstance({
            name: 'PartDs'
        });
        this.partDId = this.navParams.get('id');
        if (this.partDId === undefined){
            this.partDId = DatabaseService.generateUUID();
        }
        else {
            this.initializeFields();
        }
        this.partD.id = this.partDId;
    }

    async initializeFields() {
        let result;
        await this.partDStore.getItem(this.partDId).then(function(value, err) {
            result = value;
        });
        this.partD = result;
        return await result;
    }

    saveData(field, input) {
        this.partD[field] = input;
        DatabaseService.updateItem('PartDs', this.partDId, this.partD);
    }

    saveTieredDropdown(field, input){
        if (field === 'situation'){
            if(input.indexOf('Other') === -1){
                this.partD.situationOther = '';
            }
        }
        this.saveData(field, input);
    }

    deleteClick() {
        DatabaseService.deleteItem('PartDs', this.partDId, this.partD);
        this.navStack.pop();
    }
}
