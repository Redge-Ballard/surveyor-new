import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
    name: "filterListBy"
})

export class ListFilter implements PipeTransform {
    transform(array: Models[], args: string): Models[] {
        if (array == null){
            return null;
        }
        array.sort((n1,n2) => {
            //Sorts by highest number first
            if (args[0] === 'quantity' || args[0] === 'ENV'){
                const number1 = +n1[args];
                const number2 = +n2[args];
                if (number1 > number2){
                    return -1;
                }
                if (number1 < number2){
                    return 1;
                }
                return 0;
            }
            //Sorts by lowest number first (sequential)
            if (args[0] === 'panelNumber'){
                const number1 = +n1[args];
                const number2 = +n2[args];
                if (number1 > number2){
                    return 1;
                }
                if (number1 < number2){
                    return -1;
                }
                return 0;
            }
            if (n1[args] && n2[args]){
                const param1 = n1[args[0]].toLowerCase();
                const param2 = n2[args[0]].toLowerCase();
                if (param1 > param2){
                    return 1;
                }
                if (param1 < param2){
                    return -1;
                }
                return 0;
            }
        });
    return array;
    }
}
