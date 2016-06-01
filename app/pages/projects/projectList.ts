import {Page, NavController, NavParams} from 'ionic-angular';
import {SiteListPage} from '../sites/siteList.ts';
import {ProjectPage} from '../projects/project.ts';
const localforage = require('localforage');

@Page({
    templateUrl: 'build/pages/projects/projectList.html'
})

export class ProjectListPage {

    private navStack;
    private navParams;
    private projects;
    private projectStore = localforage.createInstance({name: "Projects"});

    constructor(nav: NavController, navParams: NavParams){
        this.navStack = nav;
        this.navParams = navParams;
        this.populateList();
    }

    itemSelected(item){
        this.navStack.push(SiteListPage, {
            title: item.name,
            projectId: item.id
        });
    }

    addClicked(){
        this.navStack.push(ProjectPage);
    }

    moreInfo(item, event){
        event.stopPropagation();
        this.navStack.push(ProjectPage, {
            id: item.id
        });
    }

    onPageWillEnter(){
        this.populateList();
    }

    populateList(){
        let projectArray = [];
        this.projectStore.iterate(function(value, key, iterationNumber){
            projectArray.push(value);
        });
        this.projects = projectArray;
    }
}
