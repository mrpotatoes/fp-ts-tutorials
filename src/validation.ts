import { Either, left, right } from 'fp-ts/lib/Either'
import { chain } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'

const minLength = (s: string): Either<string, string> => s.length >= 6 ? right(s) : left('at least 6 characters')
const oneCapital = (s: string): Either<string, string> => /[A-Z]/g.test(s) ? right(s) : left('at least one capital letter')
const oneNumber = (s: string): Either<string, string> => /[0-9]/g.test(s) ? right(s) : left('at least one number')

export const validatePassword = (s: string): Either<string, string> =>
  pipe(
    minLength(s),
    chain(oneCapital),
    chain(oneNumber)
  )


export const validatePasswordTest = () => {
  console.log(validatePassword('ab'))
  // => left("at least 6 characters")

  console.log(validatePassword('abcdef'))
  // => left("at least one capital letter")

  console.log(validatePassword('Abcdef'))
  // => left("at least one number")
}