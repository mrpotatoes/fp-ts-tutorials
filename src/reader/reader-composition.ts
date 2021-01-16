// import * as R from 'fp-ts/lib/Reader'
import { reader, of, ap, map } from 'fp-ts/lib/Reader'
import { pipe } from 'fp-ts/lib/pipeable'
import { GistDependencies as Dependencies } from './types'

const logger = { log: (message: string) => console.log(message) }
const deps: Dependencies = { logger, env: 'development' }

const beforeReader = () => {
  const c = ({ logger, env }: Dependencies) => {
    logger.log(`[${env}] calling c function`)
    return 1
  }
  const b = (deps: Dependencies) => c(deps) * 2
  const a = (deps: Dependencies) => b(deps) + 1

  console.log(a(deps))
  console.log(b(deps))
}

const withReader = () => {
  // a, b and c types are the same: Reader<Dependencies, number>
  const c = ({ logger, env }: Dependencies) => {
    logger.log(`[${env}] calling c function`)
    return 1
  }

  /**
   * reader.map => code
   *    -> https://github.com/gcanti/fp-ts/blob/master/src/Reader.ts#L336
   *      -> https://github.com/gcanti/fp-ts/blob/master/src/Reader.ts#L66
   * 
   * reader.map => explain
   *  reader.map is an alias for pipe(). Take the results of funciton param
   *  1 and give it to function param 2. But, also, apply the map function
   *  to the second param.
   *  
   *  reader.map = (fa, f) => pipe(fa, map(f))
   */
  const b = reader.map(c, n => n * 2)
  const a = reader.map(b, n => n + 1)

  console.log(b(deps))
  console.log(a(deps))
}

const perfection = () => {
  const c = ({ logger, env }: Dependencies) => {
    logger.log(`[${env}] calling c function`)
    return 1
  }
  const b = (n: number) => n * 2
  const a = (n: number) => n + 1
  
  const result = pipe(
    of(a),
    ap(pipe(
      of(b),
      ap(c)
    ))
  )(deps)

  // console.log(b(deps))
  // console.log(result)

  console.log(pipe(c, map(b), map(a))(deps))
}

export default {
  example: 'https://gist.github.com/ruizb/554c17afb9cd3dedc76706862a9fa035',

  runner: () => {
    console.log('--------- beforeReader(): Our Starting point')
    beforeReader()
    console.log()
    
    console.log('--------- withReader(): Now this uses reader.map to simplify the code some')
    withReader()
    console.log()
    
    console.log('--------- perfection(): With composition now a & b are completely abstracted away from c')
    perfection()
    console.log()
  }
}