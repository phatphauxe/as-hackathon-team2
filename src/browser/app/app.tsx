import React from 'react';
import MainPage from '../components/main/main';
import './app.styles.scss';

interface Props {
  "data-testid"?:string
};

const App = (props:Props) => {
  const testId = props['data-testid'];
  return (
    <div className="App" data-testid={testId}>
      
      <MainPage />
    </div>
  );
}

export default App;
