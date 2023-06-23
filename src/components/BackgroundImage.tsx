import React, { HTMLAttributes } from 'react'
import useClasses from 'hooks/useClasses'

const styles = () => ({
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
  opacity: number
}
function BackgroundImage({ image, opacity, ...otherProps }: Props) {
  const classes = useClasses(styles)

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
