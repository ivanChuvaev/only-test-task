import { TStyleProps } from "@/shared/types";
import { CSSProperties, ReactNode } from "react";

export type TContainerProps = {
  contentClassName?: string;
  contentStyle?: CSSProperties;
  children?: ReactNode;
} & TStyleProps;