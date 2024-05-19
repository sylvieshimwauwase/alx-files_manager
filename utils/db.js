const { MongoClient } = require('mongodb');
const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;

class DBClient {
  constructor() {
    const host = DB_HOST || 'localhost';
    const port = DB_PORT || 27017;
    const database = DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect()
      .then(() => {
        this.db = this.client.db(database);
      })
      .catch((err) => {
        console.error(`MongoDB connection error: ${err}`);
      });
  }

  isAlive() {
    return this.client && this.client.isConnected();
  }

  async nbUsers() {
    if (!this.isAlive()) {
      return 0;
    }
    const usersCollection = this.db.collection('users');
    return usersCollection.countDocuments();
  }

  async nbFiles() {
    if (!this.isAlive()) {
      return 0;
    }
    const filesCollection = this.db.collection('files');
    return filesCollection.countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
