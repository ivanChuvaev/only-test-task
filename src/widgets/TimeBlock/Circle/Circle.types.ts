import { TStyleProps } from "@/shared/types";

export type TCircleProps = {
  items: string[];
  value: number;
  onChange: (index: number) => void;
} & TStyleProps;
