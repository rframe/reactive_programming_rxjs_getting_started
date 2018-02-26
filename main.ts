import {Observable} from 'rxjs';

export const logValue = (value) => console.log(value);
export const logError = (e) => console.log(`error ${e}`);
export const logComplete = () => console.log('complete');

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, 'click');

function load(url: string) {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        let movies = JSON.parse(xhr.responseText);
        movies.forEach(m => {
            let div = document.createElement('div');
            div.innerText = m.title;
            output.appendChild(div);
        })
    });
    xhr.open('GET', url);
    xhr.send();
}

click.subscribe(
        e => load('movies.json'),
        logError,
        logComplete);


