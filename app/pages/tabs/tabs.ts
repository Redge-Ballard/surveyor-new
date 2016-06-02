import {Page, NavController, NavParams} from 'ionic-angular';
import {PartAPage} from './partA/partA.ts';
import {PartBPage} from './partB/partB.ts';
import {PartCPage} from './partC/partC.ts';
import {PartDListPage} from './partD/partDList.ts';

@Page({
    templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

    tab1Root: any = PartAPage;
    tab2Root: any = PartBPage;
    tab3Root: any = PartCPage;
    tab4Root: any = PartDListPage;

    private navStack;
    private navParams;
    private title;
    private siteId;

    constructor(nav: NavController, navParams: NavParams){
        this.navStack = nav;
        this.navParams = navParams;
        this.title = this.navParams.get('title');
        this.siteId = this.navParams.get('siteId');
    }

}
