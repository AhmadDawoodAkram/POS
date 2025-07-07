import { Slot } from '@radix-ui/react-slot'
import React from 'react'

export const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<'ul'>
>((props, ref) => <ul ref={ref} data-sidebar="menu-sub" {...props} />)
SidebarMenuSub.displayName = 'SidebarMenuSub'

export const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<'li'>
>((props, ref) => <li ref={ref} {...props} />)
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem'

export type MenuSubButtonProps = React.ComponentPropsWithoutRef<'a'> & {
  asChild?: boolean
  size?: 'sm' | 'md' | 'lg'
  isActive?: boolean
}
export const SidebarMenuSubButton = React.forwardRef<HTMLAnchorElement, MenuSubButtonProps>(
  ({ asChild = false, size = 'md', isActive, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a'
    return (
      <Comp
        ref={ref}
        data-sidebar="menu-sub-button"
        data-size={size}
        data-active={isActive}
        {...props}
      />
    )
  },
)
SidebarMenuSubButton.displayName = 'SidebarMenuSubButton'

export const MenuSub = SidebarMenuSub
export const MenuSubItem = SidebarMenuSubItem
export const MenuSubButton = SidebarMenuSubButton
