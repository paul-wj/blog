import io from 'socket.io-client';


export default class WebSocket {
	socket = null;

	connect(url, path = '/socket.io') {
		console.log('Connect socket');
		this.socket = io(url, {path, reconnection: true, reconnectionDelay: 10000});
	}

	disconnect() {
		if(this.socket != null){
			console.log('Disconnect socket');
			this.socket.disconnect();
			this.socket.close();
			this.socket = null;
		}
	}

	register(channel, listener){
		if(this.socket != null){
			this.socket.on(channel, listener);
		}
	}
};

