import { Server } from 'http';
import { app } from './app';
import { Database } from './database';

class AppServer {
  private server: Server;
  private database: Database;

  async start() {
    try {
      this.database = await Database.getInstance();
      await this.database.connectDatabase();
      const PORT = process.env.PORT || 3000;
      this.server = await app.listen(PORT, () => console.log(`Server running at http://localhos:${PORT}`));
    } catch (error) {
      console.log(error);
      this.stop();
    }
  }

  async stop() {
    await this.database.close();
    this.server.close();
  }

  getInstance() {
    return this.server;
  }
}

export { AppServer };
