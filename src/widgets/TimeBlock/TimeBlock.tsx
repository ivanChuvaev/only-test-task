"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import classes from "./TimeBlock.module.scss";
import { useMemo, useRef, useState } from "react";
import { EVENT_GROUPS } from "./constants";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useWindowWidth from "@/shared/hooks/useWindowWidth";
import SwiperClass from "swiper";
import cn from "classnames";
import Cricle from "./Circle";
import Icon from "@/shared/ui/Icon";

export default function TimeBlock() {
  const [groupId, setGroupId] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperWrapperRef = useRef<HTMLDivElement>(null);
  const yearsRef = useRef<HTMLHeadingElement>(null);
  const navPrevRef = useRef<HTMLButtonElement>(null);
  const navNextRef = useRef<HTMLButtonElement>(null);

  const { isSTablet } = useWindowWidth();

  const [startYear, endYear] = useMemo(() => {
    const years = EVENT_GROUPS[groupId].events.map((event) => event.year);
    years.sort();
    return [years.at(0), years.at(-1)];
  }, [groupId]);

  const yearsNumberRef = useRef({ startYear, endYear });

  const handlePrev = () => {
    setActiveIndex(0);
    setGroupId((prev) => {
      if (prev - 1 < 0) {
        return EVENT_GROUPS.length - 1;
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    setActiveIndex(0);
    setGroupId((prev) => {
      if (prev + 1 > EVENT_GROUPS.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  const handleChangeSlide = (swiper: SwiperClass) => {
    setActiveIndex(swiper.activeIndex);
  };

  useGSAP(
    () => {
      const tween = gsap.to(yearsNumberRef.current, {
        duration: 0.4,
        startYear,
        endYear,
        onUpdate: function () {
          const sy = Math.floor(this.targets()[0].startYear);
          const ey = Math.floor(this.targets()[0].endYear);
          yearsRef.current!.innerHTML = `<span>${sy}</span> <span>${ey}</span>`;
        },
      });

      return () => tween.kill();
    },
    { dependencies: [startYear, endYear] }
  );

  return (
    <div className={classes.wrapper}>
      <div className={classes.decor}>
        <div className={classes["decor__top-left-gradient"]} />
        <div className={classes["decor__left-vertical-line"]} />
        <div className={classes["decor__center-vertical-line"]} />
        <div className={classes["decor__right-vertical-line"]} />
        <div className={classes["decor__center-horizontal-line"]} />
      </div>
      <Cricle
        className={classes.circle}
        items={EVENT_GROUPS.map((event) => event.title)}
        value={groupId}
        onChange={setGroupId}
      />
      <div className={classes.content}>
        <div className={classes.container}>
          <h2 className={classes.title}>
            Исторические
            <br />
            даты
          </h2>
        </div>
        <h2 ref={yearsRef} className={classes["title-numbers"]}>
          <span>{startYear}</span> <span>{endYear}</span>
        </h2>
        <div className={classes.container}>
          <div className={classes.divider} />
        </div>
        <div className={classes["swiper-wrapper"]}>
          <div className={classes.container}>
            <div className={classes["swiper-control"]}>
              <span>
                {(groupId + 1).toString().padStart(2, "0")}/
                {EVENT_GROUPS.length.toString().padStart(2, "0")}
              </span>
              <div className={classes["swiper-control-buttons"]}>
                <button
                  className={classes["swiper-button"]}
                  onClick={handlePrev}
                  disabled={groupId <= 0}
                >
                  <Icon name="arrows-arrow-left" />
                  {/* {"<"} */}
                </button>
                <button
                  className={classes["swiper-button"]}
                  onClick={handleNext}
                  disabled={groupId >= EVENT_GROUPS.length - 1}
                >
                  <Icon name="arrows-arrow-right" />
                  {/* {">"} */}
                </button>
              </div>
            </div>
          </div>
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={groupId}
              nodeRef={swiperWrapperRef}
              timeout={200}
              classNames={{
                enter: classes["swiper-transition-wrapper--enter"],
                exit: classes["swiper-transition-wrapper--exit"],
                enterActive: classes["swiper-transition-wrapper--enter-active"],
              }}
            >
              <div
                className={classes["swiper-transition-wrapper"]}
                ref={swiperWrapperRef}
              >
                <div className={classes["swiper-container"]}>
                  <Swiper
                    slidesPerView="auto"
                    className={cn(classes.swiper, classes.container)}
                    modules={[Navigation, Pagination]}
                    pagination={isSTablet}
                    onSlideChange={handleChangeSlide}
                    navigation={{
                      enabled: !isSTablet,
                      prevEl: navPrevRef.current,
                      nextEl: navNextRef.current,
                    }}
                    slidesOffsetBefore={isSTablet ? 20 : 0}
                    slidesOffsetAfter={isSTablet ? 20 : 0}
                    onBeforeInit={(swiper) => {
                      if (typeof swiper.params.navigation === "object") {
                        swiper.params.navigation.prevEl = navPrevRef.current;
                        swiper.params.navigation.nextEl = navNextRef.current;
                      }
                      swiper.navigation.init();
                      swiper.navigation.update();
                    }}
                  >
                    {EVENT_GROUPS[groupId].events.map((event, i) => (
                      <SwiperSlide
                        key={event.id}
                        className={cn(classes.slide, {
                          [classes["slide--active"]]: activeIndex === i,
                        })}
                      >
                        <h3>{event.year}</h3>
                        <p>{event.description}</p>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className={cn(classes["navigation-buttons"])}>
                    <div>
                      <button ref={navPrevRef}><Icon name="arrows-arrow-left" /></button>
                      <button ref={navNextRef}><Icon name="arrows-arrow-right" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </div>
  );
}
