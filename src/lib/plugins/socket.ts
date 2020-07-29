
// @ts-ignore
import io from 'socket.io-client';

class WebSocket {
    private static instance: WebSocket;

    socket: any;

    static getInstance(): WebSocket {
        if (!WebSocket.instance) {
            WebSocket.instance = new WebSocket()
        }
        return WebSocket.instance
    }

    connect(url: string, path = '/socket.io'): void {
        // eslint-disable-next-line
        console.log('Connect socket');
        this.socket = io(url, {path, reconnection: true, reconnectionDelay: 10000});
    }

    disconnect() {
        if(this.socket != null){
            // eslint-disable-next-line
            console.log('Disconnect socket');
            this.socket.disconnect();
            this.socket.close();
            this.socket = null;
        }
    }

    register(channel: any, listener: any){
        if(this.socket != null){
            this.socket.on(channel, listener);
        }
    }
}

export default WebSocket.getInstance();
