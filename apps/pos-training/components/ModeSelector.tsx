import Segmented from "@pallas-ui/components/src/ui/segmented";
import { Label } from "@pallas-ui/components/src/ui/label";

interface ModeSelectorProps {
  autoDiscount: string;
  setAutoDiscount: (value: string) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({
  autoDiscount,
  setAutoDiscount,
}) => {
  return (
    <>
      <Label css={{ fontSize: "12" }}>Discount:</Label>
      <Segmented.Root value={autoDiscount} onValueChange={setAutoDiscount}>
        <Segmented.Option value="auto" onClick={() => setAutoDiscount("auto")}>
          <Segmented.Text>auto</Segmented.Text>
        </Segmented.Option>
        <Segmented.Option
          value="custom"
          onClick={() => setAutoDiscount("custom")}
        >
          <Segmented.Text>custom</Segmented.Text>
        </Segmented.Option>
      </Segmented.Root>
    </>
  );
};

export default ModeSelector;
