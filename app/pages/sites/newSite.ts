import {Page, NavController, NavParams} from 'ionic-angular';
import {DatabaseService} from '../../services/database.ts';
import {DateAndTimeService} from '../../services/dateAndTime.ts';
const localforage = require('localforage');

@Page({
    templateUrl: 'build/pages/sites/newSite.html'
})

export class newSitePage {

    private navStack;
    private navParams;
    private siteId;
    private newSite;
    private siteStore;

    public tempName;
    public trinomial;
    public dateRecorded;

    constructor(nav: NavController, navParams: NavParams){
        this.navStack = nav;
        this.navParams = navParams;
        this.dateRecorded = DateAndTimeService.createNewTime();
        this.newSite = {id: '', parentId: this.navParams.get('projectId'), temporaryName: '', trinomial: '', dateRecorded: this.dateRecorded};
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
        this.newSite.id = this.siteId;
        console.log(this.newSite);
    }

    async initializeFields() {
        let result;
        await this.siteStore.getItem(this.siteId).then(function(value, err) {
            result = value;
        });
        this.tempName = result.temporaryName;
        this.trinomial = result.trinomial;
        this.dateRecorded = result.dateRecorded;
        this.newSite.temporaryName = this.tempName;
        this.newSite.trinomial = this.trinomial;
        this.newSite.dateRecorded = this.dateRecorded;
        return await result;
    }

    saveData(field, input) {
        this.newSite[field] = input;
        console.log(this.newSite);
        this.siteStore.setItem(this.siteId, this.newSite);
    }

    deleteClick() {
        this.siteStore.removeItem(this.siteId);
        this.navStack.pop();
    }
}
