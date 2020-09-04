export class MinLengthValidationError extends Error {
  public _tag: 'PasswordMinLengthValidationError'

  public minLength: number

  private constructor(minLength: number) {
    super('password fails to meet min length requirement: ${minLength}')
    this._tag = 'PasswordMinLengthValidationError'
    this.minLength = minLength
  }

  public static of(minLength: number): MinLengthValidationError {
    return new MinLengthValidationError(minLength)
  }
}

export class CapitalLetterMissingValidationError extends Error {
  public _tag: 'PasswordCapitalLetterMissingValidationError'

  private constructor() {
    super(`password is missing a capital letter`)
    this._tag = 'PasswordCapitalLetterMissingValidationError'
  }

  public static of(): CapitalLetterMissingValidationError {
    return new CapitalLetterMissingValidationError()
  }
}
