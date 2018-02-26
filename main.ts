import {Observable} from 'rxjs';

export const logValue = (value) => console.log(value);
export const logError = (e) => console.log(`error ${e}`);
export const logComplete = () => console.log('complete');

let numbers = [1, 5, 10];
let source = Observable.create((observer) => {
    for(let n of numbers) {
        // if(n === 5) {
        //     observer.error('Something went wrong!');
        // }
        observer.next(n);
    }
    observer.complete();
});


source.subscribe(logValue, logError, logComplete);


