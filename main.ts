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
            setTimeout(produceValue, 2000);
        } else {
            observer.complete();
        }
    };

    produceValue();
});


source.subscribe(logValue, logError, logComplete);


