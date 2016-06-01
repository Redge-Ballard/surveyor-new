import {Page, NavController, NavParams} from 'ionic-angular';
import {PartAPage} from './partA.ts';


@Page({
    templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

    tab1Root: any = PartAPage;

    private navStack;
    private navParams;
    private siteId;

    constructor(nav: NavController, navParams: NavParams){
        this.navStack = nav;
        this.navParams = navParams;
        this.siteId = this.navParams.get('siteId');
    }

}
