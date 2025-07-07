import React from 'react'

export const SidebarRootCollapsible = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>((props, ref) => <div ref={ref} {...props} />)
SidebarRootCollapsible.displayName = 'SidebarRoot'

export const SidebarRootNonCollapsible = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>((props, ref) => <div ref={ref} {...props} />)
SidebarRootNonCollapsible.displayName = 'SidebarRootNonCollapsible'

export const SidebarRootGap = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>((props, ref) => <div ref={ref} {...props} />)
SidebarRootGap.displayName = 'SidebarRootGap'

export const SidebarRootFixed = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>((props, ref) => <div ref={ref} {...props} />)
SidebarRootFixed.displayName = 'SidebarRootFixed'

export const SidebarRootInner = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>((props, ref) => <div ref={ref} data-sidebar="sidebar" {...props} />)
SidebarRootInner.displayName = 'SidebarRootInner'

export const RootCollapsible = SidebarRootCollapsible
export const RootNonCollapsible = SidebarRootNonCollapsible
export const RootGap = SidebarRootGap
export const RootFixed = SidebarRootFixed
export const RootInner = SidebarRootInner
