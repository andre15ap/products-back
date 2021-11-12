import { AppHit } from "../../models/app-hit";

interface ICreateAppHitDTO {
  namespace: string;
  key?: string;
  value: number;
}

interface IAppHitRepository {
  create({ namespace, key, value }: ICreateAppHitDTO): Promise<void>;
  remove(id: string): Promise<void>;
  list(): Promise<AppHit[]>;
}

export { IAppHitRepository, ICreateAppHitDTO };