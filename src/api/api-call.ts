console.clear()


/**
// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------
// import { pipe } from 'fp-ts/pipeable'
// import * as O from 'fp-ts/Option'

// interface Fizz {
//   buzz: string
// }

// interface Bar {
//   bar?: Fizz
// }

// // --------------------------------------------------------------------------------------------------------------------------------
// interface Foo {
//   bar: string
// }

// const foo = { bar: 'hello' }

// console.log(pipe(foo, (f) => f.bar))
// const foo2 = { bar: 'hello', } as Foo | undefined
// const bar = { bar: undefined } as Bar | undefined

// console.log(pipe(foo2, (f) => f?.bar))

// // { _tag: 'Some', value: 'hello' }
// const deets = pipe(
//   foo,
//   O.fromNullable,
//   O.map(({ bar }) => bar),
//   O.getOrElse(() => 'borked')
//   // O.fold(
//   //   () => 'a none',
//   //   (a) => `a some containing: ${a}`
//   // )
// )

// const deets2 = pipe(
//   undefined,
//   O.fromNullable,
//   O.map(({ bar }) => bar),
//   O.getOrElse(() => 'borked')
//   // O.fold(
//   //   () => 'a none',
//   //   (a) => `a some containing: ${a}`
//   // )
// )

// const deets3 = pipe(
//   bar,
//   O.fromNullable,
//   O.map(({ bar }) =>
//     pipe(
//       bar,
//       O.fromNullable,
//       O.map(({ buzz }) => buzz),
//     ),
//   ),
//   O.flatten,
//   O.getOrElse(() => 'borked')
// )

// console.log(deets)
// console.log(deets2)
// console.log(deets3)

// // Property 'bar' does not exist on type 'Foo | undefined'.
// //  -- The compiler can't destructure an object that is possibly undefined
// // console.log(pipe(foo2, ({ bar }) => bar))
 */

/**
// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------
// // https://medium.com/better-programming/functional-programming-how-to-send-and-validate-api-requests-in-typescript-5954e99f9418
// import { either, taskEither } from 'fp-ts'
// import { flow } from 'fp-ts/function'
// import { pipe } from 'fp-ts/pipeable'
// import { fold } from 'fp-ts/Either'
// import axios from 'axios'

// export enum CountryCode {
//   EUR = 'EUR', USD = 'USD', CAD = 'CAD', HKD = 'HKD', ISK = 'ISK', PHP = 'PHP', DKK = 'DKK', HUF = 'HUF', CZK = 'CZK', GBP = 'GBP', RON = 'RON', SEK = 'SEK', IDR = 'IDR', INR = 'INR', BRL = 'BRL', RUB = 'RUB', HRK = 'HRK', JPY = 'JPY', THB = 'THB', CHF = 'CHF', MYR = 'MYR', BGN = 'BGN', TRY = 'TRY', CNY = 'CNY', NOK = 'NOK', NZD = 'NZD', ZAR = 'ZAR', MXN = 'MXN', SGD = 'SGD', AUD = 'AUD', ILS = 'ILS', KRW = 'KRW', PLN = 'PLN'
// }

// interface ExchangeRates {
//   rates: {
//     [key in CountryCode]: number
//   };
//   base: CountryCode
//   date: string
// }

// // We create a function that could fail & returns a Promise
// const fetchExchangeRatesForCountry = async (cc: CountryCode): Promise<ExchangeRates> => {
//   const res = await axios.get(`https://api.exchangeratesapi.io/latest?base=${cc}`)
//   // console.log(res.data.rates)
//   return res.data as ExchangeRates
// }

// const validateExchangeRates = (countryCode: CountryCode) => (response: ExchangeRates): either.Either<Error, ExchangeRates> => {
//   return response.base === countryCode
//     ? either.right(response as ExchangeRates)
//     : either.left(
//       Error(`Invalid exchange rates data! Expected ${countryCode} but got ${response.base}`)
//     )
// }

// export const exchangeRates = (countryCode: CountryCode): Promise<any> =>
//   pipe(
//     // tryCatch transforms our Promise that may reject to a Promise that never rejects and returns an Either instead
//     taskEither.tryCatch(
//       // We need an anonymous function here because we can only use tryCatch with functions that return Lazy<Promise<any>>
//       () => fetchExchangeRatesForCountry(countryCode),
//       either.toError
//     ),
//     taskEither.chain(
//       // flow => function composition (from left to right)
//       // could also be written without flow() => taskEither.fromEither(validateExchangeRates(countryCode))
//       // we validate our response
//       // => returns Either
//       // => transform Either to TaskEither
//       flow(validateExchangeRates(countryCode), taskEither.fromEither)
//     )
//   )()

// export const apiCallTest = async () => {
//   const onLeft = (error: any) => `Das Error: ${error}`
//   const onRight = (value: any) =>  `Value: ${value}`
//   const deets = await exchangeRates(CountryCode.USD)

//   // const t = pipe(deets, fold(onLeft, onRight))
//   // console.log(t)

//   // console.log(fold(onLeft, onRight))

//   // console.log(typeof deets)
//   console.log(deets.right)
// }

// apiCallTest()
 */