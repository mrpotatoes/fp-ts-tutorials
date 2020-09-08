import { MinLengthValidationError, CapitalLetterMissingValidationError } from './errors'

export type PasswordValidationError = | MinLengthValidationError | CapitalLetterMissingValidationError

export type HashFn = (value: string) => string

export interface Password {
  _tag: 'Password'
  value: string
  isHashed: boolean
}

export type PasswordSpecification = {
  minLength?: number
  capitalLetterRequired?: boolean
}
