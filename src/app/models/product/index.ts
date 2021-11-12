import { v4 as uuidV4 } from 'uuid';

interface IProduct {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
}

class Product {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image?: string;

  constructor({ name, description, price, image }: IProduct) {
    if (!this.id) {
      this.id = uuidV4();
    }
    this.description = description;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

export { Product };
