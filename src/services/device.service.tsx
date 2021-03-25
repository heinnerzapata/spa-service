import V7HttpRequest from './v7HttpRequest.service';

class DeviceService {
  getDeviceHistory(deviceId: string) {
    const urlDeviceHistory = `/cmms-gateway-ms/devices/history/${deviceId}`;

    return V7HttpRequest.get(urlDeviceHistory);
  }
}

export default new DeviceService();
