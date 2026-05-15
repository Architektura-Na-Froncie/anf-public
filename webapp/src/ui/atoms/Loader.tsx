import React from 'react';
import { CSSProperties } from 'styled-components';

import { colors } from 'ui/palette'

interface LoaderProps {
  fillColor?: CSSProperties['color']
}

// inspired by https://loading.io/spinner/eclipse/-eclipse-ring-circle-rotate
export const Loader: React.FC<LoaderProps> = ({ fillColor = colors.mainBlue }) => {
  return <svg data-testid="img-loader" xmlns="http://www.w3.org/2000/svg" xmlns-xlink="http://www.w3.org/1999/xlink"
    style={{ margin: "auto", display: "block" }}
    width="80px" height="80px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <path d="M7 50A43 43 0 0 0 93 50A43 46 0 0 1 7 50" fill={fillColor} stroke="none">
      <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51.5;360 50 51.5"></animateTransform>
    </path>
  </svg>
}
