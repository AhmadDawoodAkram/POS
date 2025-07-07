import React from 'react'

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>((props, ref) => {
  return <div ref={ref} data-sidebar="footer" {...props} />
})
SidebarFooter.displayName = 'SidebarFooter'

export const Footer = SidebarFooter
