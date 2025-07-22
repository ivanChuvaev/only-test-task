import { TIconName, TIconProps } from './Icon.types'
import { forwardRef, SVGProps } from 'react'
import ArrowsArrowLeft from '@/shared/assets/icons/arrows-arrow-left.svg'
import ArrowsArrowRight from '@/shared/assets/icons/arrows-arrow-right.svg'

const iconsMap = new Map<
  TIconName,
  React.ComponentType<SVGProps<SVGSVGElement>>
>([
  ['arrows-arrow-left', ArrowsArrowLeft],
  ['arrows-arrow-right', ArrowsArrowRight],
])

const Icon = forwardRef<SVGSVGElement, TIconProps>(function Icon(
  { name, width = 24, height = 24, ...props },
  ref
) {
  const SvgComponent = iconsMap.get(name)
  if (SvgComponent) {
    return <SvgComponent ref={ref} width={width} height={height} {...props} />
  }
  return <svg ref={ref} width={width} height={height} {...props} />
})

export default Icon
