console.clear()

import { Eq, contramap } from 'fp-ts/lib/Eq'
import { assert } from 'console'

type User = {
  userId: number
  name: string
}

// How do I do deep comparisons of records?
const eqNumber: Eq<number> = {
  equals: (x, y) => x === y
}

/**
 * contramap (fp-ts signature):
 * <A, B>(f: (b: B) => A) => (fa: Eq<A>) => Eq<B>
 * 
 * In practice it follows as such (given the below example)
 * 
 * contramap will return a function given 2 params
 *    param 1 -> Extractor
 *      -> Think of this part like a map() method. For the record
 *         given it'll return something that will be given to the
 *         next function to compare. Speaking of which ...
 *    param 2 -> Comparator
 *      -> This method does the actual comparison. For the example
 *         below it returns an Eq which we then have a function to 
 *         do the comparison (see above).
 * 
 * Note: I have no idea where the math nor the name comes from.
 * 
 * @TODO: Research the math and name and formalize my findings
 * in a document in my referance docs.
 */

/** Two users are equal if their `userId` field is equal */
const eqUser = contramap((user: User) => user.userId)(eqNumber)

export default {
  title: 'Equality\nTesters',
  test: () => {
    const one = eqUser.equals({ userId: 1, name: 'Giulio' }, { userId: 1, name: 'Giulio Canti' })
    const two = eqUser.equals({ userId: 1, name: 'Giulio' }, { userId: 2, name: 'Giulio' })

    assert(one, "{ userId: 1, name: 'Giulio' } == { userId: 1, name: 'Giulio Canti' }")
    assert(two, "{ userId: 1, name: 'Giulio' } != { userId: 2, name: 'Giulio' }")
  }
}