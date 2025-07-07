import type { PropertyTransform, UtilityConfig } from '@pandacss/types'


export const colorMix: (...args: Parameters<PropertyTransform>) => {
    color: string
    amount: string | number
    value: string
} = (value: string, { token }) => {
    const [color, opacityAmount] = value.split('/')
    const amount = !Number.isNaN(Number(opacityAmount)) ? Number(opacityAmount) : 100
    const colorValue = token(`colors.${color}`)
    const opacityValue = token(`opacity.${amount}`)
    const amountValue = opacityValue ? Number(opacityValue) * 100 : `${100 - amount}%`

    return {
        color: colorValue ?? color,
        amount: amountValue,
        value: `color-mix(in srgb, transparent ${amountValue}, ${colorValue})`,
    }
}
export const borderColorAlpha: UtilityConfig = {
    borderAlpha: {
        shorthand: ['bca'],
        property: 'borderColor',
        className: 'border_color_alpha',
        transform: (...args) => {
            const { value, color } = colorMix(...args)

            return {
                '--sp-bca': value,
                borderColor: `var(--sp-bca, ${color})`,
            }
        },
    },
}