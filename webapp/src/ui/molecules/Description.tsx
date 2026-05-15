import React, { ComponentType } from 'react';
import styled from 'styled-components'
import { Typography } from 'ui/atoms/Typography';
import { Section } from 'ui/layout';

const DescriptionWrapper = styled(Section)`
  border-radius: 4px;
  padding: 10px;
  background-color: #fafafa;
`

interface DescriptionProps {
  header: React.ReactNode
  children: (C: ComponentType) => React.ReactNode
}

export const Description: React.FC<DescriptionProps> = (props) => {
  const { header, children } = props


  return <DescriptionWrapper>
    <Typography variant="h2">{ header }</Typography>
    { children(({ ...childrenProps }) => <Typography variant="body" {...childrenProps} />) }
    {/* <Typography variant="decorated">{ children }</Typography> */}
  </DescriptionWrapper>
}
