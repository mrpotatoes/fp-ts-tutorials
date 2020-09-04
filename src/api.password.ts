import * as E from 'fp-ts/Either'
import crypto from 'crypto'
import { HashFn, Password, PasswordValidationError, PasswordSpecification } from './types/password'
import { MinLengthValidationError, CapitalLetterMissingValidationError } from './errors/password'

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

export const hash = (hashFn: HashFn) => (
  (password: Password): Password => ({
    ...password,
    value: hashFn(password.value),
    isHashed: true,
  })
)

export const hashed = hash((value) => crypto.createHash('md5').update(value).digest('hex'))