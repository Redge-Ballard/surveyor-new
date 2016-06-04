import {Page, NavController, NavParams} from 'ionic-angular';
import {DatabaseService} from '../../services/database.ts';
import {DateAndTimeService} from '../../services/dateAndTime.ts';
import {Models} from '../../dataLists/dataModels.ts';
import {lists} from '../../dataLists/dropDownLists.ts';
const localforage = require('localforage');

@Page({
    templateUrl: 'build/pages/sites/site.html'
})

export class SitePage {

    private navStack;
    private navParams;
    private siteId;
    private site;
    private siteStore;

    public counties = lists.countyList;

    constructor(nav: NavController, navParams: NavParams){
        this.navStack = nav;
        this.navParams = navParams;

        this.site = Object.assign({}, Models.site, {'parentId': this.navParams.get('projectId'), 'dateRecorded': DateAndTimeService.createNewDate()});
        
        this.siteStore = localforage.createInstance({
            name: 'Sites'
        });
        this.siteId = this.navParams.get('id');
        if (this.siteId === undefined){
            this.siteId = DatabaseService.generateUUID();
        }
        else {
            this.initializeFields();
        }
        this.site.id = this.siteId;
    }

    async initializeFields() {
        let result;
        await this.siteStore.getItem(this.siteId).then(function(value, err) {
            result = value;
        });
        this.site = result;
        return await result;
    }

    saveData(field, input) {
        this.site[field] = input;
        DatabaseService.updateItem('Sites', this.siteId, this.site);
    }

    deleteClick() {
        DatabaseService.deleteItem('Sites', this.siteId, this.site);
        this.navStack.pop();
    }
}
