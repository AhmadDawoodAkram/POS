# Form

A flexible and accessible form component built with Radix UI primitives and react-hook-form.

## Features

- Accessibility labels
- Customizable form fields
- Support for hooks using react-hook-form
- Support for Zod schema-based validation
- Ellipsis for truncated paths
- TypeScript support
- Follows Radix UI patterns

## Installation

```bash
npm install @your-scope/sidebar
```

## Usage

```tsx
import Sidebar from '@your-scope/sidebar'

function Example() {
  return (
    <Form.Provider form={form} onSubmit={handleSubmit}>
      <Form.Field
        name="text"
        control={form.control}
        render={({ field }) => {
          return (
            <Form.Item>
              <Form.Label htmlFor="text-1">Text</Form.Label>
              <Form.Control>
                <Input>
                  <Input.Text id="text-1" />
                </Input>
              </Form.Control>
              <Form.Description></Form.Description>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
      <Form.Field
        name="checkbox"
        control={form.control}
        render={({ field }) => {
          return (
            <Form.Item>
              <Form.Label>Checkbox</Form.Label>
              <Form.Control>
                <Checkbox
                  id="checkbox-1"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
                <Label htmlFor="checkbox-1"></Label>
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
      <Form.Field
        name="radio"
        control={form.control}
        render={({ field }) => {
          return (
            <Form.Item>
              <Form.Label>Radio</Form.Label>
              <Form.Control>
                <RadioGroup.Root {...field} value={field.value} onValueChange={field.onChange}>
                  <RadioGroup.Item value="1" id="radio-1" />
                  <Label htmlFor="radio-1">1</Label>
                  <RadioGroup.Item value="2" id="radio-2" />
                  <Label htmlFor="radio-2">2</Label>
                </RadioGroup.Root>
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
      <Button type="submit">Submit</Button>
    </Form.Provider>
  )
}
```

## Components

Provider,
Field,
Item,
Label,
Control,
Description,
Message

- `Form.Provider` - The provider element
- `Form.Field` - The field wrapper element
- `Form.Item` - The wrapper element and provider for the Field's Label, Control, Description, and Message elements
- `Form.Label` - The field label element
- `Form.Control` - The wrapper element for the fields input control
- `Form.Description` - The field description element to describe requirements for a field
- `Form.Message` - The field message element to show messages based on the field state

## License

MIT
