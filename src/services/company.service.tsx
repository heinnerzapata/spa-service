import V7HttpRequest from "./v7HttpRequest.service";

class CompanyService {
  updateCompany(data: any, companyId: string) {
    const urlCreateCompany = `/cmms-gateway-ms/company/${companyId}`;
    return V7HttpRequest.put(data, urlCreateCompany);
  }

  setCompany(data: any) {
    const urlCreateCompany = `/cmms-gateway-ms/company`;
    return V7HttpRequest.post(data, urlCreateCompany);
  }

  getCompany(companyHexId: string) {
    const urlGetConmpany = `/cmms-gateway-ms/company/${companyHexId}`;
    return V7HttpRequest.get(urlGetConmpany);
  }
}

export default new CompanyService();
