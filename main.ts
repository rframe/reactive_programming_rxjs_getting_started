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
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }
        });
        xhr.open('GET', url);
        xhr.send();
    })
            .retryWhen(retryStrategy({attempts: 3, delay: 1500}))
}

function retryStrategy({attempts = 4, delay = 1000}) {
    return function (errors) {
        return errors
                .scan((acc, value) => ++acc, 0)
                .takeWhile(acc => acc < attempts)
                .delay(delay);
    }
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
