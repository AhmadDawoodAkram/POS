import type { Meta, StoryObj } from '@storybook/react'
import { X } from 'lucide-react'
import { Button } from '../ui/button'
import Drawer from '../ui/drawer'

const meta: Meta<typeof Drawer.Root> = {
  title: 'Components/Drawer',
  component: Drawer.Root,
  tags: ['autodocs'],
  render: (args) => (
    <Drawer.Root {...args}>
      <Drawer.Trigger asChild>
        <Button>Open Drawer</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
          >
            <Drawer.Title>Drawer Title</Drawer.Title>
            <Drawer.Close>
              <X />
            </Drawer.Close>
          </div>
          <Drawer.Description>This is a description for the drawer content.</Drawer.Description>
        </Drawer.Header>

        <Drawer.Body>
          <p>Here is some content inside the drawer.</p>
          <p>You can add any components or content in this section.</p>
        </Drawer.Body>

        <Drawer.Footer>
          <Button variant="outlined" size="sm" style={{ marginRight: '0.5rem' }}>
            Cancel
          </Button>
          <Button size="sm">Save Changes</Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  ),
  argTypes: {
    side: { control: 'inline-radio', options: ['left', 'right'] },
  },
}

export default meta

type Story = StoryObj<typeof Drawer.Root>

export const Default: Story = {
  args: {
    side: 'left',
  },
}

export const Right: Story = {
  args: {
    side: 'right',
  },
}

export const Minimal: Story = {
  render: (args) => (
    <Drawer.Root {...args}>
      <Drawer.Trigger asChild>
        <Button>Open Minimal</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
          >
            <Drawer.Title>Simple Drawer</Drawer.Title>
            <Drawer.Close>
              <X />
            </Drawer.Close>
          </div>
        </Drawer.Header>
        <Drawer.Body>
          <p>Essential content only.</p>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  ),
  args: {
    side: 'left',
  },
}
