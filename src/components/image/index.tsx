import React from 'react';
import { LazyLoadImage, ScrollPosition, trackWindowScroll } from 'react-lazy-load-image-component';

import noPhoto from 'assets/no-photo.png';
import { ReactComponent as ImageLoader } from 'assets/loader.svg';

interface ImageProps {
  image: string;
  scrollPosition: ScrollPosition;
}

const Image: React.FC<ImageProps> = React.forwardRef(({ image, scrollPosition, ...rest }, ref) => {
  return (
    <LazyLoadImage
      className="flex imageContainer"
      placeholder={<ImageLoader />}
      onError={e => {
        e.currentTarget.src = noPhoto;
      }}
      src={image}
      scrollPosition={scrollPosition}
      {...rest}
    />
  );
});

export default trackWindowScroll(Image);
