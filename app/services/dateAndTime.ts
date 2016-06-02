export class DateAndTimeService {

    constructor() {
    }

    static createNewDate() {
        const date = new Date;
        const day = date.getDay();
        const month = date.toLocaleString('en-us', {month : 'long'});
        const year = date.getFullYear();

        return day + ' ' + month + ' ' + year;
    }

    static createNewTime() {
        const date = new Date;
        const day = date.getDay();
        const month = date.toLocaleString('en-us', {month : 'long'});
        const year = date.getFullYear();
        let minute;
        let hour;
        let period = 'AM';

        if (date.getHours() > 12) {
            const pastNoon = date.getHours() - 12;
            if (pastNoon < 12){
                hour = pastNoon;
            }
            else {
                hour = 12;
            }
        }
        else {
            hour = date.getHours();
        }

        if (date.getMinutes() < 10) {
            minute = '0' + date.getMinutes();
        }
        else {
            minute = date.getMinutes();
        }

        if (date.getHours() >= 12){
            period = 'PM';
        }

        return day + ' ' + month + ' ' + year + ' ' + hour + ':' + minute + ' ' + period;
    }
}
