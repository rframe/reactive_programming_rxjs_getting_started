import {Observable} from 'rxjs';

export const logValue = (value) => console.log(value);
export const logError = (e) => console.log(`error ${e}`);
export const logComplete = () => console.log('complete');

let circle = document.getElementById('circle');
let source = Observable.fromEvent(document, "mousemove")
        .map((event: MouseEvent) => ({x: event.clientX, y: event.clientY}))
        .filter((value) => value.x < 500)
        .delay(300);

function onNext(value) {
    circle.style.left = `${value.x}px`;
    circle.style.top = `${value.y}px`;
}

source.subscribe(onNext, logError, logComplete);


