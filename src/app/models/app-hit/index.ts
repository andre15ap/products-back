import { v4 as uuidV4 } from 'uuid';

interface IAppHit {
  id?: string;
  namespace: string;
  key?: string;
  value: number;
}

class AppHit {
  id?: string;
  namespace: string;
  key?: string;
  value: number;

  constructor({ namespace, key, value }: IAppHit) {
    if (!this.id) {
      this.id = uuidV4();
    }
    this.namespace = namespace;
    this.key = key;
    this.value = value;
  }
}

export { AppHit };