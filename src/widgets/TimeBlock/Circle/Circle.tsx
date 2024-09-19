import classes from "./Circle.module.scss";
import cn from "classnames";
import { TCircleProps } from "./Circle.types";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";

function minRotationDifference(angle1: number, angle2: number): number {
  const normalizedAngle1 = ((angle1 % 360) + 360) % 360;
  const normalizedAngle2 = ((angle2 % 360) + 360) % 360;

  let difference = normalizedAngle2 - normalizedAngle1;

  if (difference > 180) {
    difference -= 360;
  } else if (difference < -180) {
    difference += 360;
  }

  return difference;
}

export default function Cricle({
  items,
  onChange,
  value,
  className,
  style,
}: TCircleProps) {
  const [rotation, setRotation] = useState((-value * 360) / items.length - 45);
  const labelRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    const rot = (-value * 360) / items.length - 45;
    const dif = minRotationDifference(rotation, rot);
    setRotation((prev) => prev + dif);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={cn(classes.wrapper, className)}>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={value}
          nodeRef={labelRef}
          timeout={200}
          classNames={{
            enter: classes["title--enter"],
            exit: classes["title--exit"],
            enterActive: classes["title--enter-active"],
          }}
        >
          <label ref={labelRef} className={classes.title}>{items[value]}</label>
        </CSSTransition>
      </SwitchTransition>
      <div
        className={classes.root}
        style={
          {
            "--rotation": `${rotation}deg`,
            ...style,
          } as CSSProperties
        }
      >
        {items.map((label, i) => (
          <div
            key={label}
            className={cn(classes.point, {
              [classes["point--active"]]: i === value,
            })}
            style={{
              left: `calc(50% + cos(${(i * 360) / items.length}deg) * 50%)`,
              top: `calc(50% + sin(${(i * 360) / items.length}deg) * 50%)`,
              transform:
                "translate(-50%, -50%) rotate(calc(var(--rotation) * -1))",
            }}
          >
            <button
              type="button"
              onClick={() => onChange(i)}
              className={classes["point-content"]}
            >
              {i + 1}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
