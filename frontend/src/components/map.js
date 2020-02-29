import React, { useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import './map.scss';

const traffalgar = [51.5131, -0.1221];

const attribution = (
	<span>
		&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy;{' '}
		<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>{' '}
		contributors
	</span>
);

export const LowCalMap = ({ artefacts, onSelect }) => {
	const [selected, setSelected] = useState(null);

	const click = ({ latlng }) => {
		setSelected(latlng);
		onSelect(latlng);
	};

	return (
		<div className="map">
			<div className="map__inside">
				<Map center={traffalgar} zoom={13} onClick={click}>
					<TileLayer
						url="https://tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=5518ced652ae4ba091ebc87ef87259bc"
						attribution={attribution}
					/>
					{artefacts !== null
						? artefacts.map(artefact => (
								<Marker position={[artefact.lat, artefact.lng]} />
						  ))
						: null}
					{selected ? <Marker position={[selected.lat, selected.lng]} /> : null}
				</Map>
			</div>
		</div>
	);
};
