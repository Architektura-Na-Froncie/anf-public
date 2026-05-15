import React from 'react';
import styled from 'styled-components';

const CheckmarkWrapper = styled.div``;

export const Checkmark: React.FC<{ className?: string }> = (props) => {
  const { className } = props;
  return (
    <CheckmarkWrapper className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 43.333 43.333">
        <path d="M35.667 4.699L32.136 8.23l-16.72 16.717-4.468-3.937-3.75-3.281-6.593 7.53 3.78 3.282 8 7 3.5 3.094 3.313-3.313 20-20 3.53-3.53-7.061-7.095z" />
      </svg>
    </CheckmarkWrapper>
  );
}
