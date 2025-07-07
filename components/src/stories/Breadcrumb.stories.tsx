import type { Meta, StoryObj } from '@storybook/react'
import Breadcrumb from '../ui/breadcrumb'

const meta: Meta<typeof Breadcrumb.Root> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb.Root,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Breadcrumb.Root>

export const Default: Story = {
  render: () => (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          <Breadcrumb.Separator />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link>
          <Breadcrumb.Separator />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
          <Breadcrumb.Separator />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/docs/components/breadcrumb" aria-current="page">
            Breadcrumb
          </Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  ),
}

export const WithCustomSeparator: Story = {
  render: () => (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          <Breadcrumb.Separator>→</Breadcrumb.Separator>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/about">About</Breadcrumb.Link>
          <Breadcrumb.Separator>→</Breadcrumb.Separator>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/about/team" aria-current="page">
            Team
          </Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  ),
}

export const Minimal: Story = {
  render: () => (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          <Breadcrumb.Separator />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/products" aria-current="page">
            Products
          </Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  ),
}
