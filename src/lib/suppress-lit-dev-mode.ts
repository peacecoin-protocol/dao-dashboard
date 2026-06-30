const globalWithLitWarnings = globalThis as typeof globalThis & {
  litIssuedWarnings?: Set<string>
}

globalWithLitWarnings.litIssuedWarnings ??= new Set()
globalWithLitWarnings.litIssuedWarnings.add('dev-mode')
