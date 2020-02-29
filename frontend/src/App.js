import React, { useState, useEffect } from 'react';
import './App.scss';

import { Intro, NavBar, LowCalMap, Pane } from './components';

const API_URL = 'http://localhost:2999';

function App() {
	const [state, setState] = useState({
		showIntro: true,
		artefacts: null,
		// artefacts: [
		// 	{
		// 		lat: 51.5131,
		// 		lng: -0.1221,
		// 		data:
		// 			"Hey I'm going to Brighton on sunday, I have three available seat in my car. Stake 20 pounds to join.",
		// 		contract: '0x232nhfij382j1948rfd2dsfa8432',
		// 	},
		// ],
		selectedPosition: null,
	});

	useEffect(() => {
		if (state.showIntro)
			setTimeout(() => {
				setState({ ...state, showIntro: false });
			}, 3950);
	}, [state]);

	useEffect(() => {
		if (state.artefacts === null)
			fetch(`${API_URL}/artefacts`)
				.then(response => response.json())
				.then(response => setState({ ...state, artefacts: response }))
				.catch(error => console.error(error));
	}, [state]);

	const handleSelect = position =>
		setState({ ...state, selectedPosition: position });

	const onSend = data => {
		const artefact = { ...data, ...state.selectedPosition };
		console.log('Sending new artefact');
		console.log({ data, state });
		fetch(`${API_URL}/artefacts`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				artefact,
			}),
		})
			.then(answer => {
				setState({
					...state,
					selectedPosition: null,
					artefacts: [...state.artefacts, artefact],
				});
			})
			.catch(error => console.error(error));
	};

	console.log({ state });

	return (
		<div className="App">
			<NavBar />
			{state.showIntro ? (
				<Intro />
			) : (
				<div class="main">
					<div class="main__left-pane">
						<Pane
							artefacts={state.artefacts}
							selectedPosition={state.selectedPosition}
							onSend={onSend}
						/>
					</div>
					<div class="main__right-pane">
						<LowCalMap artefacts={state.artefacts} onSelect={handleSelect} />
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
