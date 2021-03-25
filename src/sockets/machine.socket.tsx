import { V7SocketSubscription } from './v7SocketSubscription.socket';

class MachineSocketService {
  deviceRecordCreated(callback: any) {
    const subscription = new V7SocketSubscription(
      'http://104.248.130.21:3000/vol7er_signal_ops',
      {
        path: '/vol7er_signal_ops',
      },
    );

    return subscription.onMessage('device_record_created', callback);
  }
}

export default new MachineSocketService();
