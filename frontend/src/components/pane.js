import React from 'react';

import './pane.scss';

import { ArtefactList } from './artefact-list';
import { ArtefactForm } from './artefact-form';

export const Pane = ({ artefacts, selectedPosition, onSend }) => (
	<div className="pane">
		<div className="pane__top">
			<h2>Near me...</h2>
			{artefacts === null ? (
				<p>
					<em>Loading...</em>
				</p>
			) : (
				<ArtefactList artefacts={artefacts} />
			)}
		</div>
		<div className="pane__bottom">
			<h2>Create an artefact</h2>
			{selectedPosition ? (
				<ArtefactForm onSend={onSend} />
			) : (
				<p>
					<em>Please select a location on the map</em>
				</p>
			)}
		</div>
	</div>
);
