import React from 'react';
import './artefact-list.scss';

import { Artefact } from './artefact';

export const ArtefactList = ({ artefacts }) => (
	<div className="artefact-list">
		{artefacts.length ? (
			<div className="row">
					{artefacts.map(artefact => (
						<Artefact key={artefact.data} {...artefact} />
					))}
			</div>
		) : (
			<p>
				<em>No artefacts yet</em>
			</p>
		)}
	</div>
);
