import React from 'react'

export const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'main'>
>((props, ref) => {
  return <main ref={ref} {...props} />
})
SidebarInset.displayName = 'SidebarInset'

export const Inset = SidebarInset
