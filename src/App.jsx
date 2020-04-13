import React from 'react';
import Header from './components/Header'
import CreateRequest from './components/CreateRequest'

function App() {
  return (
    <>
      <Header />
      <button className='create-request'>Create your request</button> 
      <CreateRequest />
    </>
  );
}

export default App;