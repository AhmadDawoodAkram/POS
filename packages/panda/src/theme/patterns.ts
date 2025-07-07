import { type PatternConfig, definePattern } from '@pandacss/dev'

const createPattern = <T extends PatternConfig>(config: T): PatternConfig => {
  const baseProperties = {
    p: { type: 'property', value: 'padding' },
    px: { type: 'property', value: 'paddingInline' },
    py: { type: 'property', value: 'paddingBlock' },
    pt: { type: 'property', value: 'paddingTop' },
    pr: { type: 'property', value: 'paddingRight' },
    pb: { type: 'property', value: 'paddingBottom' },
    pl: { type: 'property', value: 'paddingLeft' },
    m: { type: 'property', value: 'margin' },
    mx: { type: 'property', value: 'marginInline' },
    my: { type: 'property', value: 'marginBlock' },
    mt: { type: 'property', value: 'marginTop' },
    mr: { type: 'property', value: 'marginRight' },
    mb: { type: 'property', value: 'marginBottom' },
    ml: { type: 'property', value: 'marginLeft' },
    w: { type: 'property', value: 'width' },
    minW: { type: 'property', value: 'minWidth' },
    maxW: { type: 'property', value: 'maxWidth' },
    h: { type: 'property', value: 'height' },
    minH: { type: 'property', value: 'minHeight' },
    maxH: { type: 'property', value: 'maxHeight' },
    position: { type: 'property', value: 'position' },
    bg: { type: 'property', value: 'backgroundColor' },
  }

  return definePattern({
    ...config,
    properties: {
      ...baseProperties,
      ...config.properties,
    },
  })
}

const box = createPattern({
  transform(props) {
    return props
  },
})

const flex = createPattern({
  properties: {
    align: { type: 'property', value: 'alignItems' },
    justify: { type: 'property', value: 'justifyContent' },
    direction: { type: 'property', value: 'flexDirection' },
    wrap: { type: 'property', value: 'flexWrap' },
    basis: { type: 'property', value: 'flexBasis' },
    grow: { type: 'property', value: 'flexGrow' },
    shrink: { type: 'property', value: 'flexShrink' },
    gap: { type: 'property', value: 'gap' },
    gapX: { type: 'property', value: 'columnGap' },
    gapY: { type: 'property', value: 'rowGap' },
    flex: { type: 'property', value: 'flex' },
  },
  transform(props) {
    const { direction, align, justify, wrap, basis, grow, shrink, gapX, gapY, ...rest } = props
    return {
      display: 'flex',
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap,
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink,
      columnGap: gapX,
      rowGap: gapY,
      ...rest,
    }
  },
})

const stack = createPattern({
  properties: {
    align: { type: 'property', value: 'alignItems' },
    justify: { type: 'property', value: 'justifyContent' },
    direction: { type: 'property', value: 'flexDirection' },
    gap: { type: 'property', value: 'gap' },
  },
  defaultValues: {
    direction: 'column',
    gap: '10px',
  },
  transform(props) {
    const { align, justify, direction, gap, ...rest } = props
    return {
      display: 'flex',
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
      gap,
      ...rest,
    }
  },
})

const vstack = createPattern({
  jsxName: 'VStack',
  properties: {
    justify: { type: 'property', value: 'justifyContent' },
    gap: { type: 'property', value: 'gap' },
    align: { type: 'property', value: 'alignItems' },
  },
  defaultValues: {
    gap: '10px',
  },
  transform(props) {
    const { justify, gap, align, ...rest } = props
    return {
      display: 'flex',
      alignItems: align,
      justifyContent: justify,
      gap,
      flexDirection: 'column',
      ...rest,
    }
  },
})

const hstack = createPattern({
  jsxName: 'HStack',
  properties: {
    justify: { type: 'property', value: 'justifyContent' },
    gap: { type: 'property', value: 'gap' },
    align: { type: 'property', value: 'alignItems' },
  },
  defaultValues: {
    gap: '10px',
    align: 'center',
  },
  transform(props) {
    const { justify, gap, align, ...rest } = props
    return {
      display: 'flex',
      alignItems: align,
      justifyContent: justify,
      gap,
      flexDirection: 'row',
      ...rest,
    }
  },
})

const grid = createPattern({
  properties: {
    gap: { type: 'property', value: 'gap' },
    columnGap: { type: 'property', value: 'gap' },
    rowGap: { type: 'property', value: 'gap' },
    columns: { type: 'number' },
    minChildWidth: { type: 'token', value: 'sizes', property: 'width' },
  },
  defaultValues(props) {
    return { gap: props['columnGap'] || props['rowGap'] ? undefined : '10px' }
  },
  transform(props, { map, isCssUnit }) {
    const { columnGap, rowGap, gap, columns, minChildWidth, ...rest } = props
    const getValue = (v: string) => (isCssUnit(v) ? v : `token(sizes.${v}, ${v})`)
    return {
      display: 'grid',
      gridTemplateColumns:
        columns != null
          ? map(columns, (v) => `repeat(${v}, minmax(0, 1fr))`)
          : minChildWidth != null
            ? map(minChildWidth, (v) => `repeat(auto-fit, minmax(${getValue(v)}, 1fr))`)
            : undefined,
      gap,
      columnGap,
      rowGap,
      ...rest,
    }
  },
})

const gridItem = createPattern({
  properties: {
    colSpan: { type: 'number' },
    rowSpan: { type: 'number' },
    colStart: { type: 'number' },
    rowStart: { type: 'number' },
    colEnd: { type: 'number' },
    rowEnd: { type: 'number' },
  },
  transform(props, { map }) {
    const { colSpan, rowSpan, colStart, rowStart, colEnd, rowEnd, ...rest } = props
    const spanFn = (v: string) => (v === 'auto' ? v : `span ${v}`)
    return {
      gridColumn: colSpan != null ? map(colSpan, spanFn) : undefined,
      gridRow: rowSpan != null ? map(rowSpan, spanFn) : undefined,
      gridColumnStart: colStart,
      gridColumnEnd: colEnd,
      gridRowStart: rowStart,
      gridRowEnd: rowEnd,
      ...rest,
    }
  },
})

const aspectRatio = createPattern({
  properties: {
    ratio: { type: 'number' },
  },
  blocklist: ['aspectRatio'],
  transform(props, { map }) {
    const { ratio = 4 / 3, ...rest } = props
    return {
      position: 'relative',
      _before: {
        content: `""`,
        display: 'block',
        height: '0',
        paddingBottom: map(ratio, (r: unknown) => `${(1 / (r as number)) * 100}%`),
      },
      '&>*': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'absolute',
        inset: '0',
        width: '100%',
        height: '100%',
      },
      '&>img, &>video': {
        objectFit: 'cover',
      },
      ...rest,
    }
  },
})
export const patterns = {
  box,
  flex,
  stack,
  vstack,
  hstack,
  grid,
  gridItem,
  aspectRatio,
}
