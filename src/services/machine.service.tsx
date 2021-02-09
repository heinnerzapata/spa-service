import V7HttpRequest from './v7HttpRequest.service';

class MachineService {
  getMachines() {
    const urlMachines = 'machines';

    return V7HttpRequest.get(urlMachines);
  }

  getMachine(hexId: any) {
    const urlMachine = `machine/${hexId}`;

    return V7HttpRequest.get(urlMachine);
  }
}

export default new MachineService();
