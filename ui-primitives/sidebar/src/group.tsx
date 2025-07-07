import { Slot } from '@radix-ui/react-slot'
import React from 'react'

export const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ ...props }, ref) => {
    return <div ref={ref} data-sidebar="group" {...props} />
  },
)
SidebarGroup.displayName = 'SidebarGroup'

export type SidebarGroupLabelProps = React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }

export const SidebarGroupLabel = React.forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
  ({ asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return <Comp ref={ref} data-sidebar="group-label" {...props} />
  },
)
SidebarGroupLabel.displayName = 'SidebarGroupLabel'

export type SidebarGroupActionProps = React.ComponentPropsWithoutRef<'button'> & {
  asChild?: boolean
}

export const SidebarGroupAction = React.forwardRef<HTMLButtonElement, SidebarGroupActionProps>(
  ({ asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp ref={ref} data-sidebar="group-action" {...props} />
  },
)
SidebarGroupAction.displayName = 'SidebarGroupAction'

export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ ...props }, ref) => <div ref={ref} data-sidebar="group-content" {...props} />)
SidebarGroupContent.displayName = 'SidebarGroupContent'

export const Group = SidebarGroup
export const GroupLabel = SidebarGroupLabel
export const GroupAction = SidebarGroupAction
export const GroupContent = SidebarGroupContent
