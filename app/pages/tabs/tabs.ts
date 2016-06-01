import {Page} from 'ionic-angular';
import {PartAPage} from './partA.ts';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  tab1Root: any = PartAPage;
  
}
