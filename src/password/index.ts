console.clear()

import crypto from 'crypto'
import * as E from 'fp-ts/Either'

import * as Password from './api.password'
import { flow, pipe } from 'fp-ts/function'
import { greenHeading, redHeading } from '../common'


const onLeft = (e: any) => `This failed, sorry (with full stack)\n${e.stack}`
const onRight = (a: any) => `a some containing: ${a.value}`
const foldies = E.fold(onLeft, onRight)

const hashedPassword = flow(
  Password.of,
  Password.validate({ minLength: 8, capitalLetterRequired: true }),
  E.map(Password.hash((value) => crypto.createHash('md5').update(value).digest('hex'))),
)

const hashedPasswordDeepErrors = flow(
  Password.of,
  Password.validate({ minLength: 8, capitalLetterRequired: true }),

  // Use .chain() instead of .map() otherwise we'll have to .map() multiple times.
  // .chain() for "wide", regular chain for simpler
  E.chainW(Password.hash2((value) => E.right(crypto.createHash('md5').update(value).digest('hex'))))
)

console.log(redHeading('THIS WILL FAIL & SHOW STACK TRACE'))
console.log(hashedPassword('pw123'))

console.log(greenHeading('\n\nTHIS ONE IS GOOD YAY!!!'))
console.log(pipe('Password123', hashedPassword))

// --------------------------------------------------------------------

console.log(redHeading('\n\nTHIS WILL FAIL & SHOW STACK TRACE'))
console.log(hashedPasswordDeepErrors('pw123'))

console.log(redHeading('\n\nTHIS WILL FAIL & SHOW STACK TRACE'))
console.log(foldies(pipe('', hashedPasswordDeepErrors)))
console.log(greenHeading('\n\nTHIS ONE IS GOOD YAY!!!'))
console.log(foldies(pipe('Password123', hashedPasswordDeepErrors)))
