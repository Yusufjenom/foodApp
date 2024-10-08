export interface CreateVendorInput {
  name: string;
  ownerName: string;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface VendorLoginInput {
  email: string;
  password: string;
}

export interface VendorPayload {
  _id: any;
  email: string;
  name: string;
  foodType: [string];
}

export interface EditVendorInputs {
  name: string;
  address: string;
  foodType: [string];
  phone: string;
}
