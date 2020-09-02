import { equal, deepEqual } from 'assert'
import { fromNullable, Option, option, some } from 'fp-ts/lib/Option'
import { traverse } from 'fp-ts/lib/Array'

const names = [
  'Bob Smith',
  'Andy Hedge',
  null,
  'Helen Newbury',
  undefined
]

const getFirstName = (name: string | null | undefined) =>
  fromNullable(name)
    .map((name) => name.split(' ')[0])

const defaultFirstName = (name: string | null | undefined) =>
  getFirstName(name).alt(some('No name'))

const result = traverse(option)(names, defaultFirstName).getOrElse([])

console.log(result)

// deepEqual(result, [
//   'Bob',
//   'Andy',
//   'No name',
//   'Helen',
//   'No name'
// ])