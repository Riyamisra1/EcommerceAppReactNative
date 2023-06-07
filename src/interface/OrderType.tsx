import {product} from './ProductDataType';

export interface orderType {
  address: string;
  amount: string;
  items: product[];
  orderDate: string;
}
