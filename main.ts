import {Observable} from 'rxjs';
import {load, loadWithFetch} from './loader';
import * as logger from './loggers';

// let source = Observable.create(observer => {
//     observer.next(1);
//     observer.next(2);
//     observer.error('Stop');
//     // throw new Error('Stop error thrown');
//     observer.next(3);
//     observer.complete();
//     //
// });

let source = Observable.merge(
        Observable.of(1),
        Observable.from([2,3,4]),
        Observable.throw(new Error('Stop!')),
        Observable.of(5)
).catch(e => {
    logger.logCaughtError(e);
    return Observable.of(10);
});

// let source = Observable.onErrorResumeNext(
//         Observable.of(1),
//         Observable.from([2,3,4]),
//         Observable.throw(new Error('Stop!')),
//         Observable.of(5)
// );

source.subscribe(
        logger.logValue,
        logger.logError,
        logger.logComplete
);




// let output = document.getElementById('output');
// let button = document.getElementById('button');
//
// let click = Observable.fromEvent(button, 'click');
//
//
// function renderMovies(movies) {
//     movies.forEach(m => {
//         let div = document.createElement('div');
//         div.innerText = m.title;
//         output.appendChild(div);
//     })
// }
//
// // load('movies.json')
// loadWithFetch('movies.json')
//         .subscribe(renderMovies);
//
// click
// // .flatMap(e => load('movies.json'))
//         .flatMap(e => loadWithFetch('movies.json'))
//         .subscribe(
//                 renderMovies,
//                 logError,
//                 logComplete);
