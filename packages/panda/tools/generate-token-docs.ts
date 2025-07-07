import type { Token } from '@pandacss/token-dictionary'

export const generateTokenDocs = (tokens: Token[]): string => {
  const groupedTokens = tokens.reduce(
    (acc, token) => {
      const category = token.extensions.category ?? 'uncategorized'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(token)
      return acc
    },
    {} as Record<string, Token[]>,
  )

  const markdown = Object.entries(groupedTokens)
    .map(([category, tokens]) => {
      const tokenList = tokens
        .map((token) => {
          const reference = `{${token.name}}`
          const description = token.description ? `\n   ${token.description}` : ''

          return `- \`${reference}\` → \`${token.value}\`${description}`
        })
        .join('\n')

      return `## ${category.charAt(0).toUpperCase() + category.slice(1)}
  ${tokenList}`
    })
    .join('\n\n')

  return `# Design Tokens Reference
  
  Use the reference syntax (e.g. \`{token.name}\`) to access these tokens in your styles.
  
  ${markdown}`
}
