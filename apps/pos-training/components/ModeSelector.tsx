import Segmented from "@pallas-ui/components/src/ui/segmented";
import { Label } from "@pallas-ui/components/src/ui/label";

interface ModeSelectorProps {
  billMode: string;
  setBillMode: (value: string) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({
  billMode,
  setBillMode,
}) => {
  return (
    <>
      <Label css={{ fontSize: "12" }}>Tax / Discount Apply Level:</Label>
      <Segmented.Root value={billMode} onValueChange={setBillMode}>
        <Segmented.Option value="order" onClick={() => setBillMode("order")}>
          <Segmented.Text>order</Segmented.Text>
        </Segmented.Option>
        <Segmented.Option value="line" onClick={() => setBillMode("line")}>
          <Segmented.Text>line</Segmented.Text>
        </Segmented.Option>
      </Segmented.Root>
    </>
  );
};

export default ModeSelector;
