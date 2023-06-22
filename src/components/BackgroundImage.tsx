import React, { HTMLAttributes } from 'react'
import useClasses from '../hooks/useClasses'

const styles = (_: any) => ({
  // TODO: type this for useClasses
  root: {
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    zIndex: 0,
  },
})

interface Props extends HTMLAttributes<HTMLDivElement> {
  image: string
  opacity: 1
}
function BackgroundImage({ image, opacity, ...otherProps }: Props) {
  const classes = useClasses(styles) as any // TODO: type this

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
