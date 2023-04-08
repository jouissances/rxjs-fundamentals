import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  mergeMap,
  switchMap,
  tap,
  of,
  merge,
  pluck,
  from,
  filter,
  catchError,
  concat,
  take,
  EMPTY,
} from 'rxjs';

import { fromFetch } from 'rxjs/fetch';

import {
  addResults,
  addResult,
  clearResults,
  endpointFor,
  search,
  form,
} from '../pokemon/utilities';
import { response } from 'express';

const endpoint = 'http://localhost:3333/api/pokemon/search/';

const search$ = fromEvent(search, 'input').pipe(
  debounceTime(300),
  map((e) => e.target.value),
  mergeMap((searchTerm) => {
    return fromFetch(endpoint + searchTerm).pipe(
      mergeMap((response) => response.json())
    );
  }),
  tap(clearResults),
  pluck('pokemon'),
  tap(addResults),
);

search$.subscribe();