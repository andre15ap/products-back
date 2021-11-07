import aws, { S3 } from 'aws-sdk';
import path from 'path';
import mime from 'mime';
import fs from 'fs';

import configMulter from './multer';

class S3Storage {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'sa-east-1',
    });
  }

  async saveFile(filename: string): Promise<string> {
    const originalPath = path.resolve(configMulter.directory, filename);

    const contentType = mime.getType(originalPath);

    if (!contentType) {
      throw new Error('File not found');
    }

    const fileContent = fs.createReadStream(originalPath);
    try {
      const response = await this.client.upload({
        Bucket: 'bucket-image-products',
        Key: filename,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contentType,
      }).promise();

      await fs.promises.unlink(originalPath);

      return response.Location;
    } catch (error) {
      console.log(error);
    }
  }
}

export default S3Storage;
