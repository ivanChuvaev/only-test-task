'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import classes from './TimeBlock.module.scss';
import { useMemo, useRef, useState } from 'react';
import { EVENT_GROUPS } from './constants';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import 'swiper/css';

export default function TimeBlock() {
  const [groupId, setGroupId] = useState(0);
  const swiperWrapperRef = useRef<HTMLDivElement>(null);

  const [startYear, endYear] = useMemo(() => {
    const years = EVENT_GROUPS[groupId].events.map((event) => event.year);
    years.sort();
    return [years.at(0), years.at(-1)];
  }, [groupId]);

  const handlePrev = () => {
    setGroupId((prev) => {
      if (prev - 1 < 0) {
        return EVENT_GROUPS.length - 1
      }
      return prev - 1;
    })
  }

  const handleNext = () => {
    setGroupId((prev) => {
      if (prev + 1 > EVENT_GROUPS.length - 1) {
        return 0;
      }
      return prev + 1;
    })
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes['top-left-gradient']} />
      <h2 className={classes.title}>
        Исторические
        <br />
        даты
      </h2>
      <h2 className={classes['title-numbers']}>
        <span>{startYear}</span> <span>{endYear}</span>
      </h2>
      <div className={classes.divider} />
      <div className={classes['swiper-wrapper']}>
        <div className={classes['swiper-control']}>
          <span>
            {(groupId + 1).toString().padStart(2, '0')}/
            {EVENT_GROUPS.length.toString().padStart(2, '0')}
          </span>
          <div className={classes['swiper-control-buttons']}>
            <button className={classes['swiper-button']} onClick={handlePrev} disabled={groupId <= 0}>{'<'}</button>
            <button className={classes['swiper-button']} onClick={handleNext} disabled={groupId >= EVENT_GROUPS.length - 1}>
              {'>'}
            </button>
          </div>
        </div>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={groupId}
            nodeRef={swiperWrapperRef}
            timeout={400}
            classNames={{
              enter: classes['swiper-transition-wrapper--enter'],
              exit: classes['swiper-transition-wrapper--exit'],
              enterActive: classes['swiper-transition-wrapper--enter-active'],
            }}
          >
            <div className={classes['swiper-transition-wrapper']} ref={swiperWrapperRef}>
              <Swiper slidesPerView="auto" className={classes.swiper}>
                {EVENT_GROUPS[groupId].events.map((event) => (
                  <SwiperSlide key={event.id} className={classes.slide}>
                    <h3>{event.year}</h3>
                    <p>
                      {event.description}
                    </p>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}
