import {Page, NavController, NavParams} from 'ionic-angular';
import {DatabaseService} from '../../services/database.ts';
const localforage = require('localforage');

@Page({
    templateUrl: 'build/pages/projects/newProject.html'
})

export class newProjectPage {

    private navStack;
    private navParams;
    private projectId;
    private newProject;
    private projectStore;

    public projectName;
    public projectNumber;

    constructor(nav: NavController, navParams: NavParams){
        this.navStack = nav;
        this.navParams = navParams;
        this.newProject = {id: '', name: '', number: ''};
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
        this.newProject.id = this.projectId;
    }

    async initializeFields() {
        let result;
        await this.projectStore.getItem(this.projectId).then(function(value, err) {
            result = value;
        });
        this.projectName = result.name;
        this.newProject.name = this.projectName;
        this.projectNumber = result.number;
        this.newProject.number = this.projectNumber;
        return await result;
    }

    saveData(field, input) {
        this.newProject[field] = input;
        console.log(this.newProject);
        this.projectStore.setItem(this.projectId, this.newProject);
    }

    deleteClick() {
        this.projectStore.removeItem(this.projectId);
        this.navStack.pop();
    }
}
