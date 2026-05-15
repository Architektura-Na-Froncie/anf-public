import React from 'react';
import styled from 'styled-components';
import { ErrorBox, Typography } from 'ui/atoms';

const LabelText = styled.label`
  user-select: none;
  line-height: 1.5rem;
  padding-top: .25rem;
  word-break: break-word;
`;

const Wrapper = styled.div<{
  layoutDirection?: 'horizontal' | 'vertical';
  noMargin?: boolean;
}>`
  display: flex;
  flex-flow: ${(props) => props.layoutDirection === 'vertical' ? 'column' : 'row'} wrap;
  align-items: flex-start;
  max-width: 480px;
  margin: ${(props) => props.noMargin ? 0 : '0 0 1rem'};

  && > ${LabelText} {
    flex: 0 0 ${(props) => props.layoutDirection === 'vertical' ? '100%' : '12rem'};
    align-self: stretch;
    max-width: ${(props) => props.layoutDirection === 'vertical' ? '100%' : '12rem'};
    margin-bottom: ${(props) => props.layoutDirection === 'vertical' ? '.25rem' : 0};
    text-align: left;
  }

  && > ${ErrorBox} {
    flex: 1 0 100%;
    margin-top: .5rem;
    padding-left: ${(props) => props.layoutDirection === 'vertical' ? 0 : '12rem'};
  }

  && > input,
  && > textarea,
  && > select {
    align-self: ${(props) => props.layoutDirection === 'vertical' ? 'stretch' : 'initial'};
  }

  textarea {
    resize: vertical;
  }
`;

export const FormField: React.FC<{
  label: string;
  className?: string;
  error?: string;
  layoutDirection?: "horizontal" | "vertical";
  noMargin?: boolean;
  htmlFor?: string;
}> = (props) => {
  const { className, children, label, error, layoutDirection, htmlFor, noMargin } = props;
  return (
    <Wrapper layoutDirection={layoutDirection} noMargin={noMargin} className={className}>
      <LabelText htmlFor={htmlFor}><Typography variant="body" noMargin as="span">{label}</Typography></LabelText>
      {children}
      {error && <ErrorBox>{error}</ErrorBox>}
    </Wrapper>
  )
}
