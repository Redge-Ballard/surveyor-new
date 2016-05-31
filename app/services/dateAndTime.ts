export class DateAndTimeService {

    constructor() {
    }

    static createNewTime() {
        const date = new Date;
        const day = date.getDay();
        const month = date.toLocaleString('en-us', {month : 'long'});
        const year = date.getFullYear();

        return day + ' ' + month + ' ' + year;
    }
}
