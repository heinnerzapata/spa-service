import UserService from './user.service';
import CompanyService from './company.service';
import DeviceService from './device.service';

const services = {
  user: UserService,
  company: CompanyService,
  device: DeviceService,
};

export default services;
