import { Dependencies } from './types'
import { pipe } from 'fp-ts/lib/pipeable'
import { flow } from 'fp-ts/lib/function'
import { map, ask, chain, Reader } from 'fp-ts/lib/Reader'

const instance: Dependencies = {
  i18n: {
    true: 'vero',
    false: 'falso'
  },
  lowerBound: 2,
}

const startingPoint = () => {
  const f = (b: boolean): string => (b ? 'true' : 'false')
  const g = (n: number): string => f(n > 2)
  const h = (s: string): string => g(s.length + 1)

  console.log(h('foo'))
}

const dependencyDriller = () => {
  const f = (b: boolean, deps: Dependencies): string => (b ? deps.i18n.true : deps.i18n.false)
  const g = (n: number, deps: Dependencies): string => f(n > 2, deps) // ok
  const h = (s: string, deps: Dependencies): string => g(s.length + 1, deps)

  console.log(h('foo', instance))
}

const usingReader = () => {
  const f = (b: boolean): Reader<Dependencies, string> => deps => {
    console.log(deps)
    return (b ? deps.i18n.true : deps.i18n.false)
  }
  const g = (n: number): Reader<Dependencies, string> => f(n > 2)
  const h = (s: string): Reader<Dependencies, string> => g(s.length + 1)

  console.log(h('foo')(instance))
}

const addingLowerbound = () => {
  const f = (b: boolean): Reader<Dependencies, string> => deps => (b ? deps.i18n.true : deps.i18n.false)
  const h = (s: string): Reader<Dependencies, string> => g(s.length + 1)

  const g = (n: number): Reader<Dependencies, string> =>
    pipe(
      ask<Dependencies>(),
      chain(deps => f(n > deps.lowerBound))
    )

  console.log(h('foo')(instance))
  console.log(h('foo')({ ...instance, lowerBound: 4 }))
}

const lastExample = () => {
  const len = (s: string): number => s.length
  const double = (n: number): number => n * 2
  const gt2 = (n: number): boolean => n > 2

  const composition1 = flow(len, double, gt2)
  // equivalent to
  const composition2 = pipe(len, map(double), map(gt2))

  console.log(composition1('a'))
  console.log(composition2('a'))
  
  console.log(composition1('aa'))
  console.log(composition2('aa'))
}

const runner = () => {
  console.log('--------- startingPoint(): Our Starting point')
  startingPoint()
  console.log()

  console.log('--------- dependencyDriller(): Now w/ dependency drilling')
  dependencyDriller()
  console.log()
  
  console.log('--------- usingReader(): Now using the Reader() monad')
  usingReader()
  console.log()
  
  console.log('--------- addingLowerbound(): Let us now add a lower bound to the deps')
  addingLowerbound()
  console.log()
  
  console.log('--------- lastExample(): The last example in the website tutorial')
  lastExample()
  console.log()
}

export default {
  example: 'https://dev.to/gcanti/getting-started-with-fp-ts-reader-1ie5',
  runner, 
}