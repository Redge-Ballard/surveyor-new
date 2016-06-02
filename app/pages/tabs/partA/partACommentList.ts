import {Page, NavController, NavParams} from 'ionic-angular';
import {PartACommentPage} from './partAComment.ts';
const localforage = require('localforage');

@Page({
    templateUrl: 'build/pages/tabs/partA/partACommentList.html'
})

export class PartACommentListPage {

    private navStack;
    private navParams;
    private siteId;
    private comments;
    private commentStore = localforage.createInstance({name: 'PartAComments'});

    constructor(nav: NavController, navParams: NavParams){
        this.navStack = nav;
        this.navParams = navParams;
        this.siteId = this.navParams.get('siteId');
        this.populateList();
    }

    addClicked() {
        this.navStack.push(PartACommentPage, {
            siteId: this.siteId
        });
    }

    moreInfo(item, event) {
        event.stopPropagation();
        this.navStack.push(PartACommentPage, {
            id: item.id,
            siteId: this.siteId
        });
    }

    onPageWillEnter() {
        this.populateList();
    }

    populateList() {
        let commentArray = [];
        const id = this.siteId;
        this.commentStore.iterate(function(value, key, iterationNumber){
            if(value.parentId === id){
                commentArray.push(value);
            }
        });
        this.comments = commentArray;
    }

}
