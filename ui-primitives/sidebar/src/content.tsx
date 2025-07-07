import React from 'react'

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>((props, ref) => {
  return <div ref={ref} data-sidebar="content" {...props} />
})
SidebarContent.displayName = 'SidebarContent'

export const Content = SidebarContent
