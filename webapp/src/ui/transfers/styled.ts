import styled from 'styled-components';

export const AccountHistoryLayout = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: auto;
  padding: 0;
  max-width: 1200px;
  text-align: left;
  box-sizing: border-box;
  gap: 30px;

  && > * {
    padding: 0;
    box-sizing: border-box;
  }

  && > :first-child {
    flex: 0 0 calc(100% - 330px);
  }

  && > :last-child {
    flex: 0 0 300px;
  }
`
