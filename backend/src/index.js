import lotion, { connect } from 'lotion';
import express from 'express';
import bodyParser from 'body-parser';

const server = express()

server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true })); 

let tendermint = lotion({
	initialState: {
		artefacts: [],
	},
});

tendermint.use((state, transaction) => {
	state.artefacts.push(transaction);
});

tendermint.start().then(async (appInfo) => {

	console.log('Tendermind blockchain started');
	console.log(appInfo.GCI);

	let { state, send } = await connect(appInfo.GCI);

	server.get('/artefacts', async (req, res) => {
		const artefacts = await state.artefacts;
		res.send(artefacts);
	})

	server.post('/artefacts', async (req, res) => {
		try {
			console.log('trying with ', req.body)
			await send(req.body.artefact)	
			res.send('sent');
		} catch(err) {
			console.warn(err);	
		}
	})

	server.listen(2999, function () {
		console.log('Low-cal server listening on port 2999!')
	});
});
