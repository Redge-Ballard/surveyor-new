import {Page, NavController, NavParams} from 'ionic-angular';
import {CommentPage} from './comment.ts';
const localforage = require('localforage');

@Page({
    templateUrl: 'build/pages/tabs/comment/commentList.html'
})

export class CommentListPage {

    private navStack;
    private navParams;
    private title;
    private siteId;
    private storeName
    private comments;
    private commentStore;

    constructor(nav: NavController, navParams: NavParams){
        this.navStack = nav;
        this.navParams = navParams;
        this.title = this.navParams.get('title');
        this.siteId = this.navParams.get('siteId');
        this.storeName = this.navParams.get('storeName');
        this.commentStore = localforage.createInstance({name: this.storeName});
        this.populateList();
    }

    addClicked() {
        this.navStack.push(CommentPage, {
            siteId: this.siteId,
            storeName: this.storeName,
            title: this.title + ' Details'
        });
    }

    moreInfo(item, event) {
        event.stopPropagation();
        this.navStack.push(CommentPage, {
            id: item.id,
            siteId: this.siteId,
            storeName: this.storeName,
            title: this.title + ' Details'
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
