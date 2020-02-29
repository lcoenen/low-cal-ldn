import React from 'react';
import './artefact.scss';

export const Artefact = ({ contract, data }) => {
	const url = `https://etherscan.io/address/${contract}`;

	return (
		<div class="artefact col s12 m6">
			<div class="card">
				<div class="card-content">
					<p>{data}</p>
				</div>
				<div class="card-action">
					<a href={url} target="_blank">
						Open on etherscan
					</a>
				</div>
			</div>
		</div>
	);
};
