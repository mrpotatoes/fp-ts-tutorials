console.clear()

import axios from 'axios'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

import { greenHeading, redHeading } from '../common'

const main = async (stat: number) => {
  const ok = await pipe(
    TE.tryCatch(
      () => axios.get(`https://httpstat.us/${stat}`),
      (reason) => new Error(`${reason}`),
    ),
    TE.map((resp) => resp.data),
  )()

  console.log(ok)
  // { _tag: 'Right', right: { code: 200, description: 'OK' } }
}

const runAll = async () => {
  console.log(greenHeading('very workie'))
  await main(200)

  console.log(redHeading('\n\nNo workie'))
  await main(500)
}

runAll()
