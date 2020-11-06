import React from 'react';
import ButtonAppBar from './components/ButtonAppBar';
import { useSelector } from 'react-redux';

function App() {

  const state = useSelector(state => state.auth);
  console.log(state);
  return (
    <div>
      <ButtonAppBar />
      <h3>{state.authLoading ? 'yes' : 'no'}</h3>

    </div>
  );
}

export default App;
