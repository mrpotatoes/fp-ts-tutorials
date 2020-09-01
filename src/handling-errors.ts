import { equal, deepEqual } from 'assert'
import { Either, either, fromNullable, left, right, tryCatch, fold } from 'fp-ts/Either'
import { traverse } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/function'

export interface IPerson {
  recurringPayment?: number
}

export interface IError {
  name: string
  message: string
}

export const getRecurringPayment = (person: IPerson): Either<Error, number> =>
  fromNullable(new Error('No Recurring Payment'))(person.recurringPayment)

export const niceNameCheck = (name: string) => {
  if (/dude/i.test(name)) {
    return 'Nice name'
  } else {
    throw new Error('Bad name')
  }
}

/**
 * A very simple implementation of resolveCommonError
 */
export const resolveCommonError = (err: any): IError => {
  if (err instanceof Error) {
    return err
  } else if (typeof err === 'string') {
    return new Error(err)
  } else {
    return new Error('Unknown error')
  }
}

const myVal = {}
// getRecurringPayment(myVal)
//   .fold(
//     // the first argument (or left) is
//     // run when the value is null or undefined
//     (err) => {
//       equal(err.message, 'No Recurring Payment')
//     },
//     // The second argument (or right) is
//     // run when the value exists
//     () => {
//       throw new Error('This should not run')
//     }
//   )

function onLeft(error: Error): string {
  return `Das Error: ${error}`
}

function onRight(value: number): string {
  return `Recurring Payment: ${value}`
}

export const handlingErrorsTest = () => {
  console.log('./handling-errors.ts => handlingErrorsTest()')

  const t = pipe(getRecurringPayment({}), fold(onLeft, onRight))
  console.log(t)
}