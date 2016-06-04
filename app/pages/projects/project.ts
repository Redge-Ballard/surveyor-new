import {Page, NavController, NavParams} from 'ionic-angular';
import {DatabaseService} from '../../services/database.ts';
import {Models} from '../../dataLists/dataModels.ts';
const localforage = require('localforage');

@Page({
    templateUrl: 'build/pages/projects/project.html'
})

export class ProjectPage {

    private navStack;
    private navParams;
    private projectId;
    private project;
    private projectStore;

    constructor(nav: NavController, navParams: NavParams){
        this.navStack = nav;
        this.navParams = navParams;

        this.project = Object.assign({}, Models.project);
        this.projectStore = localforage.createInstance({
            name: 'Projects'
        });
        this.projectId = this.navParams.get('id');
        if (this.projectId === undefined){
            this.projectId = DatabaseService.generateUUID();
        }
        else {
            this.initializeFields();
        }
        this.project.id = this.projectId;
    }

    async initializeFields() {
        let result;
        await this.projectStore.getItem(this.projectId).then(function(value, err) {
            result = value;
        });
        this.project = result;
        return await result;
    }

    saveData(field, input) {
        this.project[field] = input;
        DatabaseService.updateItem('Projects', this.projectId, this.project);
    }

    deleteClick() {
        DatabaseService.deleteItem('Projects', this.projectId, this.project);
        this.navStack.pop();
    }
}
