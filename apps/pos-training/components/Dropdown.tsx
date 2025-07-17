import Select from "@pallas-ui/components/src/ui/select";

const Dropdown = ({
  name,
  options,
  onChange,
  getLabel,
  size,
  isLoading,
}: {
  name: string;
  options: any[];
  onChange: (value: string) => void;
  getLabel: (option: any) => string;
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}) => {
  return (
    <Select.Root
      onValueChange={onChange}
      disabled={isLoading || false}
      size={size}
    >
      <Select.Trigger
        css={{
          // width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          textAlign: "center",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        <Select.Value placeholder={name} />
      </Select.Trigger>
      <Select.Content>
        {options.map((option) => (
          <Select.Item key={option.id} value={option.id}>
            {getLabel(option)}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default Dropdown;
