import classes from "./ColorBox.module.scss";
import cn from "classnames";
import { TColorBoxProps } from "./ColorBox.types";

export default function ColorBox({
  className,
  style,
  color,
  title,
}: TColorBoxProps) {
  return (
    <div
      className={cn(classes.wrapper, className)}
      style={{ background: color, ...style }}
    >
      <div>{title ?? "COLOR BOX"}</div>
    </div>
  );
}
