console.clear()

import * as E from 'fp-ts/lib/Either'
import * as Password from './api.password'
import { flow, pipe } from 'fp-ts/lib/function'

const hashedPassword = flow(
  Password.of,
  Password.validate({ minLength: 8, capitalLetterRequired: true }),
  E.map(Password.hashed),
  E.fold(
    () => 'This failed, sorry',
    (a) => `a some containing: ${a.value}`
  )
)

// These two are analogus.
console.log(hashedPassword('pw123'))
console.log(pipe('Password123', hashedPassword))
