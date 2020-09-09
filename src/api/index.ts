console.clear()
// https://rlee.dev/writing/practical-guide-to-fp-ts-part-3#eithers-in-action
// https://dev.to/ksaaskil/using-fp-ts-for-http-requests-and-validation-131c
// https://dev.to/gnomff_65/fp-ts-sequencet-and-sweet-sweet-async-typed-fp-5aop
// https://stackoverflow.com/questions/57316857/resolved-how-to-chain-dependent-taskeither-operations-in-fp-ts

// import { renderSuccess, renderError } from './render'

import fetch from 'node-fetch'
// import fetch from 'node-fetch'
import { pipe } from 'fp-ts/lib/pipeable'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import * as T from 'fp-ts/lib/Task'

import * as t from 'io-ts'
import { Film, MyError } from './types'
import { renderError, renderSuccess } from './film-either-handlers'

const name1 = 'Totoro (The Film)'
const name2 = 'Totoro (the character)'
const name3 = 'Totoro (the pokemon)'

const netError = (e: Error): MyError => {
  return {
    type: 'NetError',
    message: e.message
  }
}

const decodeError = (e: t.Errors): MyError => {
  const missingKeys = e.map(e => e.context.map(({ key }) => key).join(' .'))
  return {
    type: 'DecodeError',
    message: `Failed validation beause film is missing the following keys: ${missingKeys}`
  }
}

const getStuff = (u: string): TE.TaskEither<Error, unknown> => (
  TE.tryCatch(
    () =>
      fetch(u).then((res: any) => {
        if (!res.ok) {
          throw new Error(`fetch failed with status: ${res.status}`)
        }
        return res.json()
      }),
    E.toError
  )
)

const validate = (res: unknown): TE.TaskEither<MyError, Film> => 
  pipe(
    TE.fromEither(Film.decode(res)),
    TE.mapLeft(decodeError)
  )

export const TaskEitherAndValidateCorrect: T.Task<string> = pipe(
  getStuff(
    'https://ghibliapi.herokuapp.com/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49'
  ),
  TE.mapLeft(e => netError(e)),
  TE.chain(validate),
  TE.map(film => film.title), // for better display of data, also note the auto completion
  TE.fold(
    e => T.of(renderError(name1, e)),
    pokemon => T.of(renderSuccess(name1, pokemon))
  )
)

export const TaskEitherAndValidateFailValidation: T.Task<string> = pipe(
  getStuff(
    'https://ghibliapi.herokuapp.com/people/ba924631-068e-4436-b6de-f3283fa848f0'
  ),
  TE.mapLeft(e => netError(e)),
  TE.chain(validate),
  TE.fold(
    e => T.of(renderError(name2, e)),
    pokemon => T.of(renderSuccess(name2, pokemon))
  )
)

export const TaskEitherAndValidateFail: T.Task<string> = pipe(
  getStuff('https://pokeapi.co/api/v2/pokemon/totoro'),
  TE.mapLeft(e => netError(e)),
  TE.chain(validate),
  TE.map(film => film.title),
  TE.fold(
    e => T.of(renderError(name3, e)),
    pokemon => T.of(renderSuccess(name3, pokemon))
  )
)

const d = async () => {
  console.log(await TaskEitherAndValidateCorrect())
  console.log(await TaskEitherAndValidateFailValidation())
  console.log(await TaskEitherAndValidateFail())
}

d()

// TaskEitherAndValidateCorrect().then(e => console.log(e))
// TaskEitherAndValidateFailValidation().then(e => console.log(e))
// TaskEitherAndValidateFail().then(e => console.log(e))