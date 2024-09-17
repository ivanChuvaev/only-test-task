import { TStyleProps } from '@/shared/types';
import classes from './ColorBox.module.scss';
import cn from 'classnames';

export default function ColorBox({ className, style }: TStyleProps) {
  return <div className={cn(classes.wrapper, className)} style={style} />;
}
