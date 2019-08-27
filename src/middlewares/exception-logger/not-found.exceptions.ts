import HttpException from "./HttpException";
 
export class MerchantNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Merchant with id ${id} not found`);
  }
}

export class InquiryNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Inquiry with id ${id} not found`);
  }
}
 
 