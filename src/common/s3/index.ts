import aws, { S3 } from 'aws-sdk';
import path from 'path';
import mime from 'mime';
import fs from 'fs';

import configMulter from '../../config/multer';

const BUCKET_NAME = 'bucket-image-products';

class S3Storage {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'sa-east-1',
    });
  }

  getKey(imgUrl: string): string {
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

    const response = await this.client.upload({
      Bucket: BUCKET_NAME,
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
    await this.client.deleteObject({
      Bucket: BUCKET_NAME,
      Key: key,
    }).promise();
  }
}

export default S3Storage;
