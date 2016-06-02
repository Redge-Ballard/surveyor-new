import {Page, NavController, NavParams} from 'ionic-angular';
import {DatabaseService} from '../../../services/database.ts';
import {lists} from '../../../dataLists/dataLists.ts';
const localforage = require('localforage');

@Page({
    templateUrl: 'build/pages/tabs/partD/partD.html'
})

export class PartDPage {

    private navStack;
    private navParams;
    private partDId;
    private partD;
    private partDStore;

    public situationList = lists.panelSituationList;

    constructor(nav: NavController, navParams: NavParams){
        this.navStack = nav;
        this.navParams = navParams;
        this.partD = {id: '', parentId: this.navParams.get('siteId'), panelNumber: '', numberOfFigures: '',
        manufactureTechnique: [], affiliations: [], situation: '', situationOther: '', aspect: '',
        heightLowest: '', heightHighest: '', description: '', vandalism: '', impactingAgents: ''};
        this.partDStore = localforage.createInstance({
            name: 'PartDs'
        });
        this.partDId = this.navParams.get('id');
        if (this.partDId === undefined){
            this.partDId = DatabaseService.generateUUID();
        }
        else {
            this.initializeFields();
        }
        this.partD.id = this.partDId;
    }

    async initializeFields() {
        let result;
        await this.partDStore.getItem(this.partDId).then(function(value, err) {
            result = value;
        });
        this.partD = result;
        return await result;
    }

    saveData(field, input) {
        this.partD[field] = input;
        this.partDStore.setItem(this.partDId, this.partD);
    }

    saveTieredDropdown(field, input){
        if (field === 'situation'){
            if(input.indexOf('Other') === -1){
                this.partD.situationOther = '';
            }
        }
        this.saveData(field, input);
    }

    deleteClick() {
        this.partDStore.removeItem(this.partDId);
        this.navStack.pop();
    }
}
