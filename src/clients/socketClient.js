import { w3cwebsocket as W3CWebSocket } from 'websocket';

const msg = {
	event: 'subscribe',
	feed: 'book_ui_1',
	product_ids: [ 'PI_XBTUSD' ]
};

const getClient = (msgHandler) => {
	const client = new W3CWebSocket('wss://www.cryptofacilities.com/ws/v1');

	client.onopen = () => {
		client.send(JSON.stringify(msg));
		console.info('WebSocket Client Connected');
	};
	client.onmessage = (msg) => {
		msgHandler(msg);
	};
	client.onclose = () => {
		console.info('WebSocket Client Disconnected');
	};
	client.onerror = (err) => {
		console.error('WebSocket Client Error', err);
	};

	return client;
};

export default getClient;
