# Breadcrumb

A flexible and accessible breadcrumb navigation component built with Radix UI primitives.

## Features

- Accessible navigation structure
- Customizable separator
- Support for links and current page indicators
- Ellipsis for truncated paths
- TypeScript support
- Follows Radix UI patterns

## Installation

```bash
npm install @your-scope/breadcrumb
```

## Usage

```tsx
import { Breadcrumb } from '@your-scope/breadcrumb'

function Example() {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Current Page</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}
```

## Custom Separator

You can customize the separator between breadcrumb items:

```tsx
<Breadcrumb.Root separator={<span className="mx-2">/</span>}>
  {/* ... */}
</Breadcrumb.Root>
```

## Components

- `Breadcrumb.Root` - The root navigation element
- `Breadcrumb.List` - The ordered list container
- `Breadcrumb.Item` - Individual breadcrumb items
- `Breadcrumb.Link` - Link component for navigation
- `Breadcrumb.Page` - Current page indicator
- `Breadcrumb.Separator` - Separator between items
- `Breadcrumb.Ellipsis` - Ellipsis for truncated paths

## Accessibility

The component follows WAI-ARIA patterns for breadcrumb navigation:
- Uses semantic HTML elements (`nav`, `ol`, `li`)
- Includes proper ARIA labels and roles
- Maintains keyboard navigation support
- Provides screen reader friendly structure

## License

MIT
