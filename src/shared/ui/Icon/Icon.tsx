import loadIcon from "@/shared/utils/loadIcon";
import { TIconProps } from "./Icon.types";
import { forwardRef } from "react";

const Icon = forwardRef<SVGSVGElement, TIconProps>(function Icon(
  { name, width = 24, height = 24, ...props },
  ref
) {
  const fallback = <svg ref={ref} width={width} height={height} {...props} />;
  const SvgComponent = loadIcon(name, { fallback, cache: true });
  return <SvgComponent ref={ref} width={width} height={height} {...props} />;
});

export default Icon;
