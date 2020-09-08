import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import { HashFn, Password, PasswordValidationError, PasswordSpecification } from './types'
import { MinLengthValidationError, CapitalLetterMissingValidationError } from './errors'

export const of = (value: string): Password => ({ _tag: 'Password', value, isHashed: false })
export const fromHashed = (value: string): Password => ({ _tag: 'Password', value, isHashed: true })

export const validate = ({ minLength = 0, capitalLetterRequired = false }: PasswordSpecification = {}) => (
  (password: Password): E.Either<PasswordValidationError, Password> => {
    if (password.value.length < minLength) {
      return E.left(MinLengthValidationError.of(minLength))
    }

    if (capitalLetterRequired && !/[A-Z]/.test(password.value)) {
      return E.left(CapitalLetterMissingValidationError.of())
    }

    return E.right({ ...password, isValidated: true })
  }
)

export type HashFn2 = (value: string) => E.Either<Error, string>

export const hash = (hashFn: HashFn) => (
  (password: Password): Password => ({
    ...password,
    value: hashFn(password.value),
    isHashed: true,
  })
)

export const hash2 = (hashFn: HashFn2) => (
  (password: Password): E.Either<Error, Password> =>
    pipe(
      hashFn(password.value),
      E.map((value) => ({
        ...password,
        value,
        isHashed: true,
      })),
    )
)
