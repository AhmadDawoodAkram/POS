import React from 'react'
import { useSidebar } from './provider'

export const SidebarTrigger = React.forwardRef<
  React.ComponentRef<'button'>,
  React.ComponentPropsWithoutRef<'button'>
>(({ onClick, children, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()
  return (
    <button
      ref={ref}
      data-sidebar="trigger"
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      {children}
    </button>
  )
})
SidebarTrigger.displayName = 'SidebarTrigger'

export const Trigger = SidebarTrigger
