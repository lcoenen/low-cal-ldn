import React, {useState} from 'react';
import './artefact-form.scss';

export const ArtefactForm = ({onSend}) => {

	const [data, setData] = useState('');
	const [contract, setContract] = useState('');

	const handleClick = () => onSend({data, contract});

	return (
		<div className="artefact-form">	
			<label>
				Contract address:
				<input value={contract} onChange={e => setContract(e.target.value)} />
			</label>
			<label>
				Description:
				<textarea value={data} onChange={e => setData(e.target.value)} />
			</label>
			<button onClick={handleClick} className="btn">Create an artefact</button>
		</div>
	)
}
