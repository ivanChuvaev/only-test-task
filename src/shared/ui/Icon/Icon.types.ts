import { ComponentPropsWithoutRef } from "react";

export type TIconName =
  | 'arrows-arrow-left'
  | 'arrows-arrow-right'

export type TIconProps = {
  name: TIconName;
} & ComponentPropsWithoutRef<'svg'>;
