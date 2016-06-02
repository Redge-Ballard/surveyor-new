import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: "sentence"
})

export class SentenceFilter implements PipeTransform {
    transform(array: Models[], args): Models[] {
        if (array.length >= 2){
            const last = array.pop();
            let sentence;
            if (array.length === 1){
                sentence = array[0] + ' and ' + last;
            }
            else {
                sentence = array.join(', ') + ', and ' + last;
            }
            return sentence;
        }
        else {
            return array[0];
        }
    }
}
