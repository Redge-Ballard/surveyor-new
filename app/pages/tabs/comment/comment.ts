import {Page, NavController, NavParams, ViewController} from 'ionic-angular';
import {DatabaseService} from '../../../services/database.ts';
import {DateAndTimeService} from '../../../services/dateAndTime.ts';
const localforage = require('localforage');

@Page({
    templateUrl: 'build/pages/tabs/comment/comment.html'
})

export class CommentPage {

    private navStack;
    private navParams;
    private title;
    private siteId;
    private storeName;
    private commentId;
    private commentStore;
    private comment;
    private dateRecorded;
    private viewControl

    constructor(nav: NavController, navParams: NavParams, viewControl: ViewController){
        this.navStack = nav;
        this.navParams = navParams;
        this.viewControl = viewControl;
        this.title = this.navParams.get('title');
        this.storeName = this.navParams.get('storeName');
        this.dateRecorded = DateAndTimeService.createNewTime();
        this.comment = {id: '', parentId: this.navParams.get('siteId'),
        dateRecorded: this.dateRecorded, comment: ''};
        this.commentStore = localforage.createInstance({
            name: this.storeName
        });
        this.commentId = this.navParams.get('id');
        if (this.commentId === undefined){
            this.commentId = DatabaseService.generateUUID();
        }
        else {
            this.initializeFields();
        }
        this.comment.id = this.commentId;
        this.dateRecorded = this.comment.dateRecorded;

    }

    onPageWillEnter() {
        this.viewControl.showBackButton(false);
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

    confirmClick() {
        this.navStack.pop();
    }

    resize (element) {
        //The element that gets passed is the ionic element, not the actual textarea, so this part is sticky :|
        element.style.height = 'auto';
        element.style.height = element.scrollHeight+'px';
    }
}
