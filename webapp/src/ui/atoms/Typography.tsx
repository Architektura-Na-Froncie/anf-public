import styled, { IntrinsicElementsKeys } from "styled-components";

import React, { CSSProperties } from 'react';

type TypographyStyle = {
  tagName: IntrinsicElementsKeys;
  styles: CSSProperties;
};

type TypographyVariants = "h1" | "h2" | "h3" | "h4" | "body" | "decorated" | "bold";

const styles: { [variant in TypographyVariants]: TypographyStyle } = {
  h1: {
    tagName: 'h1',
    styles: {
      fontSize: '2.8rem',
      fontWeight: 300,
      lineHeight: 1.6,
      margin: '0 0 1.6rem',
    }
  },
  h2: {
    tagName: 'h2',
    styles: {
      fontSize: '2rem',
      fontWeight: 300,
      lineHeight: 1.2,
      margin: '0 0 1.4rem',
    }
  },
  h3: {
    tagName: 'h3',
    styles: {
      fontSize: '1.5rem',
      fontWeight: 300,
      lineHeight: 1.2,
      margin: '0 0 1.2rem',
    }
  },
  h4: {
    tagName: 'h4',
    styles: {
      fontSize: '1.15rem',
      fontWeight: 300,
      lineHeight: 1.1,
      margin: '0 0 1.1rem',
    }
  },
  body: {
    tagName: 'p',
    styles: {
      fontSize: '1rem',
      fontWeight: 300,
      lineHeight: 1.2,
      margin: '0 0 0.6rem',
    }
  },
  bold: {
    tagName: 'p',
    styles: {
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.2,
      margin: '0 0 1rem',
    }
  },
  decorated: {
    tagName: 'p',
    styles: {
      fontSize: '1rem',
      fontWeight: 200,
      lineHeight: 1.2,
      margin: '0 0 1rem',
    }
  },
}

const StyledTypography = styled.span<TypographyProps>(({ variant, bold, noMargin }) => ({
  ...styles[variant].styles,
  ...(bold ? { fontWeight: 700 } : {}),
  ...(noMargin ? { margin: 0 } : {}),
}))

interface TypographyProps {
  variant: TypographyVariants;
  as?: IntrinsicElementsKeys;
  id?: string
  bold?: boolean;
  noMargin?: boolean;
}

export const Typography: React.FC<TypographyProps> = (props) => {
  const { id, variant, bold, noMargin, children } = props;
  const { tagName } = styles[variant]; // tagName has to be `IntrinsicElementsKeys` to match "as" prop
  return <StyledTypography variant={variant} as={props.as || tagName} id={id} bold={bold} noMargin={noMargin} children={children} />;
};
