import React from 'react';
import './App.css';
import TodoPage from "./pages/TodoPage";
// @ts-ignore
import bg_dark_mobile from './assets/bg-mobile-dark.jpg';
// @ts-ignore
import bg_dark_desktop from './assets/bg-desktop-dark.jpg';

function App() {
  return (
    <div className="App">
        <div className={'background'}>
            <img className={'bg-mobile'} src={bg_dark_mobile} alt={'Background'}/>
            <img className={'bg-desktop'} src={bg_dark_desktop} alt={'Background'}/>
        </div>
      <TodoPage/>
    </div>
  );
}

export default App;
