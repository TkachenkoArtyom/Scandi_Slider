import React from 'react';
import SliderDot from './SliderDot';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import cn from 'classnames';
import { useSlidesAmount } from '../utils/useSlidesAmount';

const Carousel = ({ state }) => {
  // get values from state
  const { slides, initialSlideNumber, slidesToShow, movement, sliderWidth } = state;

  // declare hooks
  const [move, setMove] = React.useState(movement);
  const [currentSlide, setCurrentSlide] = React.useState(initialSlideNumber);
  const [lastTouch, setLastTouch] = React.useState(0);

	// get slides amount
  const slidesLength = slides.length;

  // get link of image to get it width further
  const IMAGE = React.useRef();

  // check for incorrect values
  if (slidesToShow > slidesLength) slidesToShow = slidesLength;

  if (!Array.isArray(slides) || slidesLength <= 0) {
    return null;
  }

  // if window width < 576px -> show one slide
  const visibleSlides = useSlidesAmount(slidesToShow);

  // Slides portions amount
  const slidePortionCount = Math.ceil(slidesLength / visibleSlides);

  // get dots amount
  const dots = [];
  for (let i = 1; i <= slidePortionCount; i++) {
    dots.push(i);
  }
  let dotsLength = dots.length;

	const getCurrentSlide = () => {
		if (currentSlide > slidePortionCount) {
			return slidePortionCount;
		}
		return currentSlide;
	}

  // get prev and next slides portion
	let prevPortionSlides = (getCurrentSlide() - 1) * visibleSlides + 1;
	
  let nextPortionSlides = (getCurrentSlide()) * visibleSlides;

  // show prev portion
  const showPrevSlide = () => {
    setCurrentSlide(currentSlide === 1 ? dotsLength : currentSlide - 1);
  };	

  // show next portion
  const showNextSlide = () => {
    setCurrentSlide(currentSlide === dotsLength ? 1 : currentSlide + 1);
  };

  // move slides
  const handleMovement = (delta) => {
    // add the difference to move
    let nextMove = move + delta;

    // moving slides
    setMove(nextMove);

    // the distance more than a half of image width
    if (move > IMAGE.current.offsetWidth / 2) {
      currentSlide === dots.length ? setCurrentSlide(1) : setCurrentSlide(currentSlide + 1);
      setMove(0);
      return;
    }

    if (move < -IMAGE.current.offsetWidth / 2) {
      currentSlide === 1 ? setCurrentSlide(dots.length) : setCurrentSlide(currentSlide - 1);

      setMove(0);
      return;
    }
  };

  // save last touch position
  const handleToStart = (e) => {
    setLastTouch(e.nativeEvent.touches[0].clientX);
  };

  // get the difference between old and new touch position
  const handleTouchMove = (e) => {
    const delta = lastTouch - e.nativeEvent.touches[0].clientX;
    setLastTouch(e.nativeEvent.touches[0].clientX);

    // call slides moving function
    handleMovement(delta);
  };

  // clear last touch
  const handleTouchEnd = () => {
    setLastTouch(0);
  };

  return (
    <section className="slider" style={{ maxWidth: sliderWidth + 'px' }}>
      {slides
        .filter((slide) => slide.id >= prevPortionSlides && slide.id <= nextPortionSlides)
        .map((slide) => {
          return (
            <div
              onTouchStart={handleToStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                transform: `translateX(${move * -1}px)`,
              }}
              key={slide.id}
              className={cn(
                {
                  ['slider__item--active']:
                    slide.id >= prevPortionSlides && slide.id <= nextPortionSlides,
                },
                'slider__item',
              )}>
              <img ref={IMAGE} className="slider-item__image" src={slide.imageUrl} alt="image" />
            </div>
          );
        })}
      <button className="slider__button button--prev" onClick={showPrevSlide}>
        <AiFillCaretLeft />
      </button>
      <button className="slider__button button--next" onClick={showNextSlide}>
        <AiFillCaretRight />
      </button>

      <div className="slider-dots">
        {slidePortionCount !== 1 &&
          dots.map((dot) => {
            return (
              <SliderDot
                key={dot}
                id={dot}
                currentSlide={getCurrentSlide()}
                setCurrentSlide={setCurrentSlide}
              />
            );
          })}
      </div>
    </section>
  );
};

export default Carousel;
