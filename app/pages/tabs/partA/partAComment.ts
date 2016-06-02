import {Page, NavController, NavParams} from 'ionic-angular';
import {DatabaseService} from '../../../services/database.ts';
import {DateAndTimeService} from '../../../services/dateAndTime.ts';
const localforage = require('localforage');

@Page({
    templateUrl: 'build/pages/tabs/partA/partAComment.html'
})

export class PartACommentPage {

    private navStack;
    private navParams;
    private siteId;
    private commentId;
    private commentStore;
    private comment;
    private dateRecorded;

    constructor(nav: NavController, navParams: NavParams){
        this.navStack = nav;
        this.navParams = navParams;
        this.dateRecorded = DateAndTimeService.createNewTime();
        this.comment = {id: '', parentId: this.navParams.get('siteId'),
        dateRecorded: this.dateRecorded, comment: ''};
        this.commentStore = localforage.createInstance({
            name: 'PartAComments'
        });
        this.commentId = this.navParams.get('id');
        if (this.commentId === undefined){
            console.log('New one');
            this.commentId = DatabaseService.generateUUID();
        }
        else {
            console.log('Not new one');
            this.initializeFields();
        }
        this.comment.id = this.commentId;
        this.dateRecorded = this.comment.dateRecorded;

    }

    async initializeFields() {
        let result;
        await this.commentStore.getItem(this.commentId).then(function(value, err) {
            result = value;
        });
        this.comment = result;
        return await result;
    }

    saveData(input) {
        this.comment.comment = input;
        this.commentStore.setItem(this.commentId, this.comment);
    }

    deleteClick() {
        this.commentStore.removeItem(this.commentId);
        this.navStack.pop();
    }

    resize (element) {
        console.log(element);
        console.log(element.childNodes);
        element.style.height = 'auto';
        element.style.height = element.scrollHeight+'px';
    }
}
