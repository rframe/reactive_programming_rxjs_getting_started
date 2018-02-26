import {Observable} from 'rxjs';
import {load, loadWithFetch} from './loader';
import * as logger from './loggers';



let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, 'click');


function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement('div');
        div.innerText = m.title;
        output.appendChild(div);
    })
}

// loadWithFetch('movies.json')
let subscription = load('movies.json')
        .subscribe(
                renderMovies,
                logger.logError,
                logger.logComplete
        );

console.log(subscription);
subscription.unsubscribe();

click
// .flatMap(e => load('movies.json'))
        .flatMap(e => loadWithFetch('movies.json'))
        .subscribe(
                renderMovies,
                logger.logError,
                logger.logComplete
        );
