import {Page, NavController, NavParams} from 'ionic-angular';
import {CommentListPage} from '../comment/commentList.ts';
import {DatabaseService} from '../../../services/database.ts';
import {lists} from '../../../dataLists/dataLists.ts';
const localforage = require('localforage');

@Page({
    templateUrl: 'build/pages/tabs/partA/partA.html'
})

export class PartAPage {

    private navStack;
    private navParams;
    private siteId;
    private partA;
    private partAStore;

    public prehistoricTypes = lists.prehistoricTypeList;
    public historicTypes = lists.historicTypeList;

    constructor(nav: NavController, navParams: NavParams){
        this.navStack = nav;
        this.navParams = navParams;
        this.siteId = this.navParams.data;
        this.partA = {parentId: this.siteId, UTMzone: '', UTMe: '', UTMn: '', dimensionL: '', dimensionW: '', area: '',
        class: [], prehistoricType: [], otherPrehistoric: '', historicType: [],  otherHistoric: '', nrhpStatus: '',
        nrhpJustification: '', siteDescription: [], partAComments: [], locationAccess: []};
        this.partAStore = localforage.createInstance({
            name: 'PartAs'
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
        await this.partAStore.getItem(this.siteId).then(function(value, err) {
            result = value;
        });
        if (result !== null){
            this.partA = result;
        }
        return await result;
    }

    saveData(field, input) {
        this.partA[field] = input;
        this.partAStore.setItem(this.siteId, this.partA);
    }

    saveTieredDropdown(field, input){
        if (field === 'class'){
            if(input.indexOf('Prehistoric') === -1 && input.indexOf('Ethnographic') === -1){
                this.partA.prehistoricType = [];
                this.partA.otherPrehistoric = '';
            }
            if(input.indexOf('historic') === -1){
                this.partA.historicType = [];
                this.partA.otherHistoric = '';
            }
        }
        else if (field === 'prehistoricType'){
            if(input.indexOf('Other Prehistoric') === -1){
                this.partA.otherPrehistoric = '';
            }
        }
        else {
            if(input.indexOf('Other Historic') === -1){
                this.partA.otherHistoric = '';
            }
        }
        this.saveData(field, input);
    }

    goToPage(page) {
        switch (page) {
            case 'NHRP':
                break;
            case 'SiteDescription':
                break;
            case 'PartAComments':
                this.navStack.push(CommentListPage, {
                    siteId: this.siteId,
                    partA: this.partA,
                    storeName: 'PartAComments',
                    title: 'Part A Comments'
                });
                break;
            case 'Location':
                break;
        }
    }
}
