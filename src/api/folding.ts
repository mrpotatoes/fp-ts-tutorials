console.clear()

import axios from 'axios'
import * as TE from 'fp-ts/lib/TaskEither'
import { absurd, constVoid, pipe, unsafeCoerce } from 'fp-ts/lib/function'
import { clear } from 'console'

const result = pipe(
  TE.tryCatch(
    () => axios.get('https://httpstat.us/500'),
    () => constVoid() as never,
  ),
  TE.map((resp) => unsafeCoerce<unknown, any>(resp.data)),
  TE.fold(absurd, TE.of),
) // Not executing the promise

// Result is of type:
// T.Task<Resp>

result().then(i => console.log(i))
