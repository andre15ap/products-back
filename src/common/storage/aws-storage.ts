import aws from 'aws-sdk';
import path from 'path';
import mime from 'mime';
import fs from 'fs';

import configMulter from '../../config/multer';
import { IStorage } from './interface';

class StorageFile implements IStorage {
  private readonly AWS_REGION = process.env.AWS_REGION;
  private readonly BUCKET_NAME = process.env.AWS_BUCKET_NAME;

  private getInstance() {
    return new aws.S3({ region: this.AWS_REGION });
  }

  private getKey(imgUrl: string): string {
    const index = imgUrl.indexOf('.com/');
    const key = imgUrl.slice(index + 5);
    return key;
  }

  async saveFile(filename: string): Promise<string> {
    const originalPath = path.resolve(configMulter.directory, filename);

    const contentType = mime.getType(originalPath);

    if (!contentType) {
      throw new Error('File not found');
    }

    const fileContent = fs.createReadStream(originalPath);

    const s3 = this.getInstance();

    const response = await s3.upload({
      Bucket: this.BUCKET_NAME,
      Key: filename,
      ACL: 'public-read',
      Body: fileContent,
      ContentType: contentType,
    }).promise();

    await fs.promises.unlink(originalPath);

    return response.Location;
  }

  async deleteFile(url: string): Promise<void> {
    const key = this.getKey(url);

    const s3 = this.getInstance();

    await s3.deleteObject({
      Bucket: this.BUCKET_NAME,
      Key: key,
    }).promise();
  }
}

export { StorageFile };
