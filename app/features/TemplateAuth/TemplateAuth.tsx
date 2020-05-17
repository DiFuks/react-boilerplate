import React from 'react';
import styled from 'styled-components';

import { themeSelector } from '@app/common/utils/themeSelector';

export const TemplateAuth: React.FC = ({ children }) => (
  <TemplateStyled>
    <MainStyled>{children}</MainStyled>
    <FooterStyled>
      ©
      {' '}
      {(new Date().getFullYear())}
    </FooterStyled>
  </TemplateStyled>
);

const TemplateStyled = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainStyled = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const FooterStyled = styled.footer`
  text-align: center;
  height: 50px;
  color: ${themeSelector.contrastText};
`;
