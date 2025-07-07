import React from 'react'

export const Sidebarheader = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>((props, ref) => {
  return <div ref={ref} data-sidebar="header" {...props} />
})
Sidebarheader.displayName = 'SidebarHeader'

export const Header = Sidebarheader
