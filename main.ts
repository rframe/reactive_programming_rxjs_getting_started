import {Observable} from 'rxjs';

export const logValue = (value) => console.log(value);
export const logError = (e) => console.log(`error ${e}`);
export const logComplete = () => console.log('complete');

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, 'click');

function load(url: string): Observable<any> {
    // return Observable.fromEvent(xhr, 'load')
    //         .map();
    return Observable.create(observer => {

        let xhr = new XMLHttpRequest();


        xhr.addEventListener('load', () => {
            let data = JSON.parse(xhr.responseText);
            observer.next(data);
            observer.complete();
        });
        xhr.open('GET', url);
        xhr.send();
    })
}

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement('div');
        div.innerText = m.title;
        output.appendChild(div);
    })
}

load('movies.json')
        .subscribe(renderMovies); // load method is lazy, no request is sent until there is a subscriber

click.flatMap(e => load('movies.json'))
        .subscribe(
                renderMovies,
                logError,
                logComplete);

// click.subscribe(
//         e => load('movies.json').subscribe(), // no subscribe in a subscribe
//         logError,
//         logComplete);

// click.flatMap(e => load('movies.json'))
//         .subscribe(o => console.log(o));



