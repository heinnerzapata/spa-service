import { io } from 'socket.io-client';

export class V7SocketSubscription {
  private socket: any;

  private url: string;

  public constructor(url: string, options: any) {
    this.url = url;
    this.socket = io(this.url, options);
  }

  public send(topic: string, message: any): void {
    this.socket.emit(topic, message);
  }

  public onMessage(topic: string, callback: any) {
    this.socket.on(topic, (result: any) => callback(result));
  }

  public disconnect(): void {
    this.socket.disconnect();
  }
}

export default V7SocketSubscription;
