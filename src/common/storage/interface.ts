export interface IStorage {
  saveFile(filename: string): Promise<string>;
  deleteFile(url: string): Promise<void>;
};
