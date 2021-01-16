import * as R from 'fp-ts/lib/Reader'

type Printer = (message: string) => string

export default {
  example: 'https://gist.github.com/ruizb/554c17afb9cd3dedc76706862a9fa035',

  runner: () => {
    const printer = (s: string): string => s
    const createPrettyName =
      (name: string): R.Reader<Printer, string> =>
        (printer: Printer) => printer(`hello ${name}`)

    const reader = R.reader.map(createPrettyName('Tom'), (s: string) => `>>> ${s} <<<`)
    
    console.log(reader(printer))
  }
}