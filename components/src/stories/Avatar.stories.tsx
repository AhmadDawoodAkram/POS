import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from '@styled-system/jsx'
import { User, User2, Users } from 'lucide-react'
import Avatar from '~/ui/avatar'

const meta: Meta<typeof Avatar.Root> = {
  title: 'Components/Avatar',
  tags: ['autodocs'],
  component: Avatar.Root,
  args: {
    children: (
      <>
        <Avatar.Image src="https://github.com/nanopx.png" />
        <Avatar.Fallback>AR</Avatar.Fallback>
      </>
    ),
  },
}

export default meta

type Story = StoryObj<typeof Avatar.Root>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" gap="4" align="center">
      <Avatar.Root size="sm">
        <Avatar.Image src="https://github.com/nanopx.png" />
        <Avatar.Fallback>SM</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root size="md">
        <Avatar.Image src="https://github.com/nanopx.png" />
        <Avatar.Fallback>MD</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root size="lg">
        <Avatar.Image src="https://github.com/nanopx.png" />
        <Avatar.Fallback>LG</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root size="xl">
        <Avatar.Image src="https://github.com/nanopx.png" />
        <Avatar.Fallback>XL</Avatar.Fallback>
      </Avatar.Root>
    </Stack>
  ),
}

export const Shapes: Story = {
  render: () => (
    <Stack direction="row" gap="4" align="center">
      <Avatar.Root size="lg" shape="circle">
        <Avatar.Image src="https://github.com/nanopx.png" />
        <Avatar.Fallback>CR</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root size="lg" shape="square">
        <Avatar.Image src="https://github.com/nanopx.png" />
        <Avatar.Fallback>SQ</Avatar.Fallback>
      </Avatar.Root>
    </Stack>
  ),
}

export const TextFallbacks: Story = {
  render: () => (
    <Stack direction="row" gap="4" align="center">
      <Avatar.Root size="md">
        <Avatar.Fallback>AK</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root size="lg">
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root size="xl">
        <Avatar.Fallback>RW</Avatar.Fallback>
      </Avatar.Root>
    </Stack>
  ),
}

export const IconFallbacks: Story = {
  render: () => (
    <Stack direction="row" gap="4" align="center">
      <Avatar.Root size="md">
        <Avatar.Fallback>
          <User />
        </Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root size="lg">
        <Avatar.Fallback>
          <User2 />
        </Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root size="xl">
        <Avatar.Fallback>
          <Users />
        </Avatar.Fallback>
      </Avatar.Root>
    </Stack>
  ),
}

export const WithControls: Story = {
  args: {
    size: 'md',
    shape: 'circle',
    children: (
      <>
        <Avatar.Image src="https://github.com/nanopx.png" />
        <Avatar.Fallback>AR</Avatar.Fallback>
      </>
    ),
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'radio',
      options: ['circle', 'square'],
    },
  },
}
