import logo from './logo.svg';
import './App.css';
import React from 'react'
import Main from './components/Main';
import {useDispatch, useSelector} from 'react-redux'
import { uiActions } from './store/index';


function App() {

  const mode = useSelector(state => state.ui.mode)
  const dark = useSelector(state => state.ui.dark)
  const dispatch = useDispatch()

  function changeMode(){
    if(dark){
      dispatch(uiActions.toggleDark())
      dispatch(uiActions.changeMode('sun'))    
    }
    else{
      dispatch(uiActions.toggleDark())
      dispatch(uiActions.changeMode('moon'))
    }
  }


  return (
    <React.Fragment>
      <div className='headimage'>
        <div className='head'>
          <h1>TODO</h1>
          <img src={mode} onClick={changeMode} />
        </div>
      </div>
      <div className='bottom'>
        <Main />
      </div>
    </React.Fragment>
  );
}

export default App;
