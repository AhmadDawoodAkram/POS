import type { Meta, StoryObj } from '@storybook/react'
import { css } from '@styled-system/css'
import { HStack } from '@styled-system/jsx'
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import Command from '../ui/command'

const meta: Meta<typeof Command.Root> = {
  title: 'Forms/Command',
  component: Command.Root,
  tags: ['autodocs'],
  render: (_args) => (
    <Command.Root css={{ maxW: '[450px]', minH: '[350px]' }}>
      <Command.Input placeholder="Type a command or search..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Suggestions">
          <Command.Item icon={<Calendar />}>Calendar</Command.Item>
          <Command.Item icon={<Smile />}>Search Emoji</Command.Item>
          <Command.Item disabled icon={<Calculator />}>
            Calculator
          </Command.Item>
        </Command.Group>
        <Command.Separator />
        <Command.Group heading="Settings">
          <Command.Item icon={<User />}>Profile</Command.Item>
          <Command.Item icon={<CreditCard />}>Billing</Command.Item>
          <Command.Item icon={<Settings />}>Settings</Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Root>
  ),
  decorators: (Story) => {
    return (
      <div
        className={css({
          w: 'full',
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <Story />
      </div>
    )
  },
}

export default meta

export const Default: Story = {
  args: {},
}

type Story = StoryObj<typeof Command.Dialog>

export const Dialog: Story = {
  render: (_args) => {
    const [open, setOpen] = useState(false)
    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }
      document.addEventListener('keydown', down)
      return () => document.removeEventListener('keydown', down)
    }, [])
    return (
      <Command.Dialog open={open} onOpenChange={setOpen} css={{ w: '[450px]' }}>
        <Command.Input placeholder="Type a command or search..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Suggestions">
            <Command.Item icon={<Calendar />}>Calendar</Command.Item>
            <Command.Item icon={<Smile />}>Search Emoji</Command.Item>
            <Command.Item disabled icon={<Calculator />}>
              Calculator
            </Command.Item>
          </Command.Group>
          <Command.Separator />
          <Command.Group heading="Settings">
            <Command.Item icon={<User />}>Profile</Command.Item>
            <Command.Item icon={<CreditCard />}>Billing</Command.Item>
            <Command.Item icon={<Settings />}>Settings</Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    )
  },
  decorators: (Story) => {
    return (
      <HStack css={{ justifyContent: 'center' }}>
        <p
          className={css({
            color: '{colors.text.secondary}',
            fontSize: 'sm',
          })}
        >
          Press{' '}
          <kbd
            className={css({
              bg: '{colors.primary.bg}',
              display: 'inline-flex',
              h: 5,
              alignItems: 'center',
              gap: 1,
              rounded: 'md',
              px: 1.5,
              fontFamily: 'mono',
              fontSize: 'sm',
              opacity: 1,
            })}
          >
            <span className="text-xs">⌘</span>J
          </kbd>
        </p>
        <Story />
      </HStack>
    )
  },
}
