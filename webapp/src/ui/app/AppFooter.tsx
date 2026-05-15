import styled from 'styled-components';
import { colors } from 'ui/palette';
import { Container } from "../layout";
import { FC } from "react";
import { Link } from "react-router-dom";

const Footer = styled.footer`
  flex: 0 0 auto;
  padding: 20px;
  min-height: 20px;
  color: ${colors.footerText};
`;

const FooterContainer = styled(Container)`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  padding: 20px 0;
  border-top: 1px solid ${colors.footerBorder};
  font-size: .9rem;
`;

const FooterCopy = styled.div`
`;

const FooterLinks = styled.nav`
  margin: 0 -10px;

  a {
    margin: 0 10px;
    color: inherit;
    text-decoration: none;
  }
`;

export const AppFooter: FC = () => {
  return <Footer>
    <FooterContainer>
      <FooterCopy>
        &copy; 2021 ACME Corp.
      </FooterCopy>
      <FooterLinks>
        <Link to=''>Polityka prywatności</Link>
        <Link to=''>Nota prawna</Link>
        <Link to=''>Kontakt</Link>
      </FooterLinks>
    </FooterContainer>
  </Footer>
}
