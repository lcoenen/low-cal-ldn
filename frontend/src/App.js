import React, { useState, useEffect } from 'react';
import './App.scss';

import { Intro, NavBar } from './components';

function App() {
	const [state, setState] = useState({
		showIntro: true
	})

	useEffect(() => {
		setTimeout(() => {
			setState({...state, showIntro: false});	
		}, 3999)		
	})

  return (
    <div className="App">
			<NavBar />
			{state.showIntro? <Intro />	: null}
    </div>
  );
}

export default App;
