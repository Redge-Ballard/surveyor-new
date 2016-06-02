import {Page, NavController, NavParams} from 'ionic-angular';
import {PartDPage} from './partD.ts';
import {filters} from '../../../services/filter.ts';
const localforage = require('localforage');

@Page({
    templateUrl: 'build/pages/tabs/partD/partDList.html'
})

export class PartDListPage {

    private navStack;
    private navParams;
    private siteId;
    private partDList;
    private partDStore = localforage.createInstance({name: "PartDs"});

    constructor(nav: NavController, navParams: NavParams){
        this.navStack = nav;
        this.navParams = navParams;
        this.siteId = this.navParams.data;
        this.populateList();
    }

    itemSelected(item){
        this.navStack.push(PartDPage, {
            id: item.id,
            siteId: item.id
        });
    }

    addClicked() {
        this.navStack.push(PartDPage, {
            siteId: this.siteId
        });
    }

    onPageWillEnter() {
        this.populateList();
        console.log(this.partDList);
    }

    populateList() {
        let partDArray = [];
        const id = this.siteId;
        this.partDStore.iterate(function(value, key, iterationNumber){
            if(value.parentId === id){
                partDArray.push(value);
            }
        });
        this.partDList = partDArray;
    }
}
