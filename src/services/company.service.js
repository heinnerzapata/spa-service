import V7HttpRequest from './v7HttpRequest.service';

class CompanyService {
  createCompany(data) {
    const urlCreateCompany = `company`;
    return V7HttpRequest.post(data, urlCreateCompany);
  }

  getCompany(companyHexId) {
    const urlGetConmpany = `company/${companyHexId}`;
    return V7HttpRequest.get(urlGetConmpany);
  }
}

export default new CompanyService();
