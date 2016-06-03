import {Page, NavController, NavParams} from 'ionic-angular';
import {CommentListPage} from '../comment/commentList.ts';
import {DatabaseService} from '../../../services/database.ts';
import {Models} from '../../../dataLists/dataModels.ts';
import {lists} from '../../../dataLists/dropDownLists.ts';
const localforage = require('localforage');

@Page({
    templateUrl: 'build/pages/tabs/partC/partC.html'
})

export class PartCPage {

    private navStack;
    private navParams;
    private useDates;
    private useDatesStore;
    private siteId;

    constructor(nav: NavController, navParams: NavParams){
        this.navStack = nav;
        this.navParams = navParams;
        this.siteId = this.navParams.data;

        //This JSON trick clones the object
        this.useDates = JSON.parse(JSON.stringify(Models.siteUseDates));
        this.useDates.parentId = this.siteId;

        this.useDatesStore = localforage.createInstance({
            name: 'SiteUseDates'
        });
        if (this.initializeFields() == null){
            this.saveData('parentId',this.siteId);
        }
        else {
            this.initializeFields();
        }
    }

    async initializeFields() {
        let result;
        await this.useDatesStore.getItem(this.siteId).then(function(value, err) {
            result = value;
        });
        if (result !== null){
            this.useDates = result;
        }
        return await result;
    }

    saveData(field, input) {
        this.useDates[field] = input;
        DatabaseService.updateItem('SiteUseDates', this.siteId, this.useDates);
    }

    goToPage(page) {
        switch (page) {
            case 'ArchFeatures':
                break;
            case 'NonArchFeatures':
                break;
            case 'FeatureComments':
                this.navStack.push(CommentListPage, {
                    siteId: this.siteId,
                    storeName: 'HistoricFeatureComments',
                    title: 'Feature Comments'
                });
                break;
            case 'Cans':
                break;
            case 'CanComments':
                this.navStack.push(CommentListPage, {
                    siteId: this.siteId,
                    storeName: 'CanComments',
                    title: 'Can Comments'
                });
                break;
            case 'Ceramics':
                break;
            case 'CeramicComments':
                this.navStack.push(CommentListPage, {
                    siteId: this.siteId,
                    storeName: 'CeramicComments',
                    title: 'Ceramic Comments'
                });
                break;
            case 'Bottles':
                break;
            case 'BottleComments':
                this.navStack.push(CommentListPage, {
                    siteId: this.siteId,
                    storeName: 'GlassBottleComments',
                    title: 'Glass Bottle Comments'
                });
                break;
            case 'Artifacts':
                break;
            case 'PartCComments':
                this.navStack.push(CommentListPage, {
                    siteId: this.siteId,
                    storeName: 'PartCComments',
                    title: 'Part C Comments'
                });
                break;
        }
    }
}
