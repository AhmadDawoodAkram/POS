'use client'
import type { Assign, WithFixedClassName } from '@pallas-ui/style-context'
import type { ProgressVariantProps } from '@styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from '@styled-system/types'
import type * as React from 'react'
import type { ProgressBar } from 'react-aria-components'
import { CircleFill } from './circleFill'
import { CircleTrack } from './circleTrack'
import { LineFill } from './lineFill'
import { LineTrack } from './lineTrack'
import { Root, withContext } from './root'
import { SVG } from './svg'

export type RootProps = Assign<
  WithFixedClassName<ComponentProps<typeof ProgressBar>>,
  Omit<ProgressVariantProps, 'strokeWidth'> &
    Partial<{
      width: number
      height: number
      steps: number
      stepToGapRatio: number
      strokeWidth: number | 'sm' | 'md' | 'lg'
    }>
>

export const Label = withContext<React.ElementRef<'p'>, HTMLStyledProps<'p'>>('p', 'label')

const Progress = {
  Root,
  SVG,
  Label,
  LineTrack,
  LineFill,
  CircleTrack,
  CircleFill,
}

export default Progress
