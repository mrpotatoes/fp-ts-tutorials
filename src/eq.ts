import { Eq, contramap } from 'fp-ts/lib/Eq'

// <A, B>(f: (b: B) => A) => (fa: Eq<A>) => Eq<B>
// contramap

type User = {
  userId: number
  name: string
}

// How do I do deep comparisons of records?
const eqNumber: Eq<number> = {
  equals: (x, y) => x === y
}

/** two users are equal if their `userId` field is equal */
const eqUser = contramap((user: User) => user.userId)(eqNumber)

export const eqTest = () => {
  const one = eqUser.equals({ userId: 1, name: 'Giulio' }, { userId: 1, name: 'Giulio Canti' }) // true
  const two = eqUser.equals({ userId: 1, name: 'Giulio' }, { userId: 2, name: 'Giulio' }) // false

  console.log(one)
  console.log(two)
}
