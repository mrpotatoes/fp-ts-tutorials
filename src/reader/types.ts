export interface Dependencies {
  i18n: {
    true: string
    false: string
  }
  lowerBound: number
}

export interface GistDependencies {
  logger: { log: (message: string) => void }
  env: 'development' | 'production'
}
