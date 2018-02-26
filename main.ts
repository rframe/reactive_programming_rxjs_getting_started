import {Observable, Observer} from 'rxjs';

export const logValue = (value) => console.log(value);
export const logError = (e) => console.log(`error ${e}`);
export const logComplete = () => console.log('complete');

let numbers = [1, 5, 10];
let source = Observable.from(numbers);


source.subscribe(logValue, logError, logComplete);

class MyObserver implements Observer<number> {
    next(value) {
        logValue(value);
    }
    error(e) {
        logError(e);
    }
    complete() {
        logComplete();
    }
}

// source.subscribe(new MyObserver());
// source.subscribe(new MyObserver());

