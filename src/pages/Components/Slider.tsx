import React, { useState } from 'react';
import { Slider } from 'antd';

const AppSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    'src/assets/image/image1.jpg',
    'src/assets/image/image2.jpg',
    'src/assets/image/image3.jpg',
    'src/assets/image/image5.jpg',

  ];

  const handleSliderChange = (value) => {
    setCurrentImageIndex(value);
  };

  return (
    <div className='slider'>
      <img
        src={images[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
        style={{ maxWidth: '100%', marginBottom: '16px' }}
      />
      <Slider
        min={0}
        max={images.length - 1}
        defaultValue={0}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default AppSlider;