import {Observable} from 'rxjs';

export const logValue = (value) => console.log(value);
export const logError = (e) => console.log(`error ${e}`);
export const logComplete = () => console.log('complete');

let numbers = [1, 5, 10];
let source = Observable.create((observer) => {

    let index = 0;

    let produceValue = () => {
        observer.next(numbers[index++]);
        if (index < numbers.length) {
            setTimeout(produceValue, 250);
        } else {
            observer.complete();
        }
    };

    produceValue();
})
        .map(n => n * 2)
        .filter(n => n > 4);


source.subscribe(logValue, logError, logComplete);


