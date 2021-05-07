import React from 'react'
import styles from './Slide.module.scss'

function Slide() {
  return (
    <div className={styles.slider}>
      <div className={styles.sliderItem}>The 2 slide</div>
      <div className={styles.sliderItem}>The 1 slide</div>
      <div className={styles.sliderItem}>The 3 slide</div>
    </div>
  )
}

export default Slide
