import {Page, NavController, NavParams} from 'ionic-angular';
import {CommentListPage} from '../comment/commentList.ts';
import {DatabaseService} from '../../../services/database.ts';
import {lists} from '../../../dataLists/dataLists.ts';
const localforage = require('localforage');

@Page({
    templateUrl: 'build/pages/tabs/partB/partB.html'
})

export class PartBPage {

    private navStack;
    private navParams;
    private affiliation;
    private affiliationStore;
    private siteId;

    public affiliationList = lists.affiliations;

    constructor(nav: NavController, navParams: NavParams){
        this.navStack = nav;
        this.navParams = navParams;
        this.siteId = this.navParams.data;
        this.affiliation = {parentId: this.siteId, list: [], other: ''};
        this.affiliationStore = localforage.createInstance({
            name: 'CulturalTemporalAffiliation'
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
        await this.affiliationStore.getItem(this.siteId).then(function(value, err) {
            result = value;
        });
        if (result !== null){
            this.affiliation = result;
        }
        return await result;
    }

    saveData(field, input) {
        this.affiliation[field] = input;
        this.affiliationStore.setItem(this.siteId, this.affiliation);
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
                    storeName: 'PrehistoricFeatureComments',
                    title: 'Feature Comments'
                });
                break;
            case 'Debitage':
                break;
            case 'Tools':
                break;
            case 'FlakedStoneComments':
                this.navStack.push(CommentListPage, {
                    siteId: this.siteId,
                    storeName: 'FlakedStoneComments',
                    title: 'Flaked Stone Comments'
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
            case 'GroundStones':
                break;
            case 'GroundStoneComments':
                this.navStack.push(CommentListPage, {
                    siteId: this.siteId,
                    storeName: 'GroundStoneComments',
                    title: 'Ground Stone Comments'
                });
                break;
            case 'Artifacts':
                break;
            case 'PartBComments':
                this.navStack.push(CommentListPage, {
                    siteId: this.siteId,
                    storeName: 'PartBComments',
                    title: 'Part B Comments'
                });
                break;
        }
    }
}
