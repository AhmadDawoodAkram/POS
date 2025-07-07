export type ProxyValue<T> = {
  // biome-ignore lint/style/useShorthandFunctionType: <explanation>
  <Value>(definition: Value extends T ? Value : T): Value
} & {
  [K in keyof Required<T>]: <Value>(definition: Value extends T[K] ? Value : T[K]) => Value
}
