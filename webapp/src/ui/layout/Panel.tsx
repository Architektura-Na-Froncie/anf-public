import styled from 'styled-components';

export const Panel = styled.div<{}>`
  position: relative;
  margin: auto;
  padding: 45px 30px;
  background: #fff;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, .05);
  max-width: 540px;
  min-height: 240px;
  box-sizing: border-box;
  text-align: left;
`;

export const BorderedPanel = styled.div`
  position: relative;
  margin: 0 0 1rem;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid rgba(0, 0, 0, .15);
  background: #fff;
  box-sizing: border-box;
`;
