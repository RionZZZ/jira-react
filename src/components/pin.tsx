import { Rate } from "antd";

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Pin: React.FC<PinProps> = ({
  checked,
  onCheckedChange,
  ...restProps
}) => (
  <Rate
    count={1}
    value={checked ? 1 : 0}
    onChange={(count) => onCheckedChange?.(!!count)}
    {...restProps}
  />
);
