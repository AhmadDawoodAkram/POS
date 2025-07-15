import Select from "@pallas-ui/components/src/ui/select";

const Dropdown = ({
  name,
  options,
  onChange,
  getLabel,
}: {
  name: string;
  options: any[];
  onChange: (value: string) => void;
  getLabel: (option: any) => string;
}) => {
  return (
    <Select.Root onValueChange={onChange}>
      <Select.Trigger
        css={{
          width: "100%",
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
