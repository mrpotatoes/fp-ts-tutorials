import { pipe } from 'fp-ts/pipeable'

const branchName = (str: string) => str === 'foo' ? 'bar' : 'baz'
const branchElseIf = (branch: string) => (branch === 'bar') ? `No: ${branch}` : `Yes: ${branch}`

const varargs = (args: string[]) => 
  args.slice(2).reduce((acc, arg) => {
    const parts = arg.split('=')

    return {
      [parts[0].replace('--', '')]: parts[1],
      ...acc
    }
  }, {})

const validBranchName_prePipe = (str: string) => {
  const branch = branchName(str)
  
  if (branch === 'bar') {
    return `No: ${branch}`
  } else {
    return `Yes: ${branch}`
  }
}

const validBranchName_postPipe = (str: string): string => pipe(str, branchName, branchElseIf)

export default {
  info: '',

  runner: () => {
    console.log('--------- pipe -> validBranchName(string[]): Our Starting point')
    console.log(validBranchName_prePipe('foo'))
    console.log(validBranchName_prePipe('boogz'))

    console.log('-------')
    console.log(validBranchName_postPipe('foo'))
    console.log(validBranchName_postPipe('boogz'))
    console.log('-------')
    
    // const t = varargs([
    //   '/usr/local/bin/node',
    //   '/Users/n0319505/Projects/Outside/fp-ts-tutorials/args.js',
    //   '--hey=true'
    // ])

    // console.log(t)
    // console.log()
  }
}

