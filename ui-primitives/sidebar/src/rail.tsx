import React from 'react'
import { useSidebar } from './provider'

export const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>(({ ...props }, ref) => {
  const { toggleSidebar } = useSidebar()
  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      {...props}
    />
  )
})
SidebarRail.displayName = 'SidebarRail'

export const Rail = SidebarRail
