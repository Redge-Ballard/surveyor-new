import {Page, NavController, NavParams} from 'ionic-angular';
import {DatabaseService} from '../../services/database.ts';
const localforage = require('localforage');

@Page({
    templateUrl: 'build/pages/tabs/partA.html'
})

export class PartAPage {

    private navStack;
    private navParams;
    private siteId;
    private partA;
    private partAStore;

    constructor(nav: NavController, navParams: NavParams){
        this.navStack = nav;
        this.navParams = navParams;
        //this.siteId = this.navStack.get('siteId');
        this.partA = {id: '', parentId: this.siteId};
        this.partAStore = localforage.createInstance({
            name: 'PartAs'
        });
        //this.siteId = this.navParams.get('id');
        if (this.siteId === undefined){
            this.siteId = DatabaseService.generateUUID();
        }
        else {
            //this.initializeFields();
        }
        this.partA.id = this.siteId;
    }

    async initializeFields() {
        let result;
        await this.partAStore.getItem(this.siteId).then(function(value, err) {
            result = value;
        });
        return await result;
    }

    saveData(field, input) {
        this.partA[field] = input;
        this.partAStore.setItem(this.siteId, this.partA);
    }
}
