import React, { useState } from 'react';
import styled from 'styled-components';

import { Header } from '@app/features/TemplateMain/components/Header';
import { Sidebar } from '@app/features/TemplateMain/components/Sidebar';

export const TemplateMain: React.FC = ({ children }) => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <TemplateStyled>
      <Header onMenuClick={() => setIsSidebar(!isSidebar)}/>
      <MainStyled>
        <Sidebar isOpen={isSidebar}/>
        <ContentWrapperStyled>
          <ContentStyled>
            {children}
          </ContentStyled>
        </ContentWrapperStyled>
      </MainStyled>
    </TemplateStyled>
  );
};

const TemplateStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainStyled = styled.main`
  display: flex;
  flex-grow: 1;
`;

const ContentWrapperStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ContentStyled = styled.div`
  flex-grow: 1;
  padding: 20px;
`;
