import type { Meta, StoryObj } from '@storybook/react'
import { ChevronDown } from 'lucide-react'
import Accordion from '~/ui/accordion'

const meta: Meta<typeof Accordion.Root> = {
  component: Accordion.Root,
  title: 'Components/Accordion',
  tags: ['autodocs'],
}

export default meta

export const Default = () => (
  <Accordion.Root type="single" collapsible={true} defaultValue={'0'}>
    <Accordion.Item value="0">
      <Accordion.ItemHeader>
        Accordion Header
        <Accordion.ItemTrigger>
          <ChevronDown />
        </Accordion.ItemTrigger>
      </Accordion.ItemHeader>
      <Accordion.ItemContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.Root>
)
