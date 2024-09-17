import { TContainerProps } from './Container.types';
import classes from './Container.module.scss';
import cn from 'classnames';

export default function Container({
  style,
  className,
  contentClassName,
  contentStyle,
  children,
}: TContainerProps) {
  return (
    <div className={cn(classes.wrapper, className)} style={style}>
      <div className={cn(classes.content, contentClassName)} style={contentStyle}>
        {children}
      </div>
    </div>
  );
}
