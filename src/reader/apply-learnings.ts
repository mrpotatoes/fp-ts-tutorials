import * as R from 'fp-ts/lib/Reader'

type Printer = (message: string) => string

export default {
  example: 'https://self',

  runner: () => {
    // const printer = (s: string): string => s
    // const createPrettyName =
    //   (name: string): R.Reader<Printer, string> =>
    //     (printer: Printer) => printer(`hello ${name}`)

    // const reader = R.reader.map(createPrettyName('Tom'), (s: string) => `---${s}---`)

    // console.log(reader(printer))
    console.log('oh, i learned so much')
  }
}