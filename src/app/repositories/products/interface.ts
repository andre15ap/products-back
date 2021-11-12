import { Product } from "../../models/product";

interface ICreateProductDTO {
  name: string;
  description?: string;
  price: number;
  image?: string;
}

interface IProducRepository {
  create({ name, description, price, image }: ICreateProductDTO): Promise<void>;
  findByName(name: string): Promise<Product>;
  findById(id: string): Promise<Product>;
  list(): Promise<Product[]>;
  remove(id: string): Promise<void>;
}

export { IProducRepository, ICreateProductDTO };
