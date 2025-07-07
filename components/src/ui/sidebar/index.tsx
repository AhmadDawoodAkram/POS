'use client'

import { useSidebar } from '@pallas-ui/sidebar'
import { Content } from './content'
import { Footer } from './footer'
import { Group, GroupAction, GroupContent, GroupLabel } from './group'
import { Header } from './header'
import { Inset } from './inset'
import { Menu, MenuAction, MenuBadge, MenuButton, MenuItem } from './menu'
import { Provider } from './provider'
import { Rail } from './rail'
import { Root } from './root'
import { Separator } from './separator'
import { MenuSub, MenuSubButton, MenuSubItem } from './subMenu'
import { Trigger } from './trigger'

const Sidebar = {
  Provider,
  Root,
  Content,
  Inset,
  Header,
  Footer,
  Group,
  GroupAction,
  GroupContent,
  GroupLabel,
  Menu,
  MenuAction,
  MenuBadge,
  MenuButton,
  MenuItem,
  MenuSub,
  MenuSubButton,
  MenuSubItem,
  Rail,
  Separator,
  Trigger,
  useSidebar,
}

export default Sidebar
