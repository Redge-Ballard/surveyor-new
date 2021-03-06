import {Page, NavController, NavParams} from 'ionic-angular';
import {DatabaseService} from '../../services/database.ts';
import {DateAndTimeService} from '../../services/dateAndTime.ts';
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

    constructor(nav: NavController, navParams: NavParams){
        this.navStack = nav;
        this.navParams = navParams;
        this.site = {id: '', parentId: this.navParams.get('projectId'), temporaryName: '', trinomial: '', dateRecorded: DateAndTimeService.createNewTime()};
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
        this.site.temporaryName = result.temporaryName;
        this.site.trinomial = result.trinomial;
        this.site.dateRecorded = result.dateRecorded;
        return await result;
    }

    saveData(field, input) {
        this.site[field] = input;
        this.siteStore.setItem(this.siteId, this.site);
    }

    deleteClick() {
        this.siteStore.removeItem(this.siteId);
        this.navStack.pop();
    }
}
