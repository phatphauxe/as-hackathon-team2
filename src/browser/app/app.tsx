import React from 'react';
import MainPage from '../components/main/main';
import SidePanel from '../components/side-panel/side-panel';
import './app.styles.scss';

interface Props {
  "data-testid"?:string
};

const App = (props:Props) => {
  const testId = props['data-testid'];
  return (
    <div className="App" data-testid={testId}>
      <SidePanel />
      <MainPage />
    </div>
  );
}

export default App;
