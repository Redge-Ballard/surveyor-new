import {Page, NavController, NavParams} from 'ionic-angular';
import {SitesPage} from '../sites/sites.ts';
import {newProjectPage} from '../projects/newProject.ts';
const localforage = require('localforage');

@Page({
    templateUrl: 'build/pages/projects/projects.html'
})

export class ProjectsPage {

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
        this.navStack.push(SitesPage, {
            title: item.name,
            projectId: item.id
        });
    }

    addClicked(){
        this.navStack.push(newProjectPage);
    }

    moreInfo(item, event){
        event.stopPropagation();
        this.navStack.push(newProjectPage, {
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
