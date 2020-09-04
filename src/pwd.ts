console.clear()

import { map } from 'fp-ts/lib/Either'
import { flow, pipe } from 'fp-ts/lib/function'
import * as Password from './api.password'

const hashedPassword = flow(
  Password.of,
  Password.validate({ minLength: 8, capitalLetterRequired: true }),
  map(Password.hashed),
)

// These two are analogus.
console.log(hashedPassword('pw123'))
console.log(pipe('Password123', hashedPassword))
