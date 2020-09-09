import { MyError } from "./types";
import * as C from '../common'

export const renderSuccess = (name: string, result: unknown): string =>
  `${C.greenHeading(name)}\n\n${JSON.stringify(result)}\n`

  export const renderError = (name: string, e: MyError): string =>
  `${C.redHeading(name)}\nError\n${e.type}\n${e.message}\n`
