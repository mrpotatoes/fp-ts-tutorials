console.clear()

import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

declare function begin(): Promise<void>
declare function commit(): Promise<void>
declare function rollback(): Promise<void>

const result = pipe(
  TE.tryCatch(
    () => begin(),
    (err) => new Error(`begin txn failed: ${err}`),
  ),
  TE.chain(() =>
    TE.tryCatch(
      () => commit(),
      (err) => new Error(`commit txn failed: ${err}`),
    ),
  ),
  TE.orElse((originalError) =>
    pipe(
      TE.tryCatch(
        () => rollback(),
        (err) => new Error(`rollback txn failed: ${err}`),
      ),
      TE.fold(TE.left, () => TE.left(originalError)),
    ),
  ),
)

console.log('123', result())