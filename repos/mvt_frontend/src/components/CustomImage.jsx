import React from 'react';
import { Img } from 'react-image';

const Image = ({ src, alt, className, width, height }) => {
  return (
    <Img
      src={src}
      alt={alt}
      loader={<div>Loading...</div>}
      unloader={<div>Failed to load image</div>}
      className={className}
      style={{ width, height }}
    />
  );
};

export default Image;