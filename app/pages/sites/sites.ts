import {Page, NavController, NavParams} from 'ionic-angular';
import {newSitePage} from '../sites/newSite.ts';
const localforage = require('localforage');

@Page({
    templateUrl: 'build/pages/sites/sites.html'
})

export class SitesPage {

    private navStack;
    private navParams;
    private sites;
    private siteStore = localforage.createInstance({name: "Sites"});

    public title;
    public projectId;

    constructor(nav: NavController, navParams: NavParams){
        this.navStack = nav;
        this.navParams = navParams;
        this.title = this.navParams.get('title');
        this.projectId = this.navParams.get('projectId');
        this.populateList();
    }

    itemSelected(item){

    }

    addClicked() {
        this.navStack.push(newSitePage, {
            projectId: this.projectId
        });
    }

    moreInfo(item, event) {
        event.stopPropagation();
        this.navStack.push(newSitePage, {
            id: item.id,
            projectId: this.projectId
        });
    }

    onPageWillEnter() {
        this.populateList();
    }

    populateList() {
        let siteArray = [];
        const id = this.projectId;
        this.siteStore.iterate(function(value, key, iterationNumber){
            console.log(value.parentId, id);
            if(value.parentId === id){
                siteArray.push(value);
            }
        });
        this.sites = siteArray;
    }
}
