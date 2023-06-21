import React from 'react'
import useClasses from '../hooks/useClasses'
const PREFIX = 'BackgroundImage';

const styles = theme => ({
  root: {
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    zIndex: 0,
  }
});

function BackgroundImage(props) {
  const classes = useClasses(styles)

  const { image, opacity, ...otherProps } = props

  return (
    <div
      className={classes.root}
      style={{
        backgroundImage: `url(${image})`,
        opacity: opacity,
      }}
      {...otherProps}
    />
  )
}

export default BackgroundImage
