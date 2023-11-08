
interface IDatabaseConfig {
  connectionUri: string;
  sslEnabled: boolean;
}

export const databaseConfig: IDatabaseConfig = {
  connectionUri:
    process.env.NODE_ENV === 'production'
      ? `mongodb+srv://cluster0.eckr0.mongodb.net/rogo-hotel?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority`
      : process.env.MONGO_CONNECTION_URI,
  sslEnabled: process.env.MONGO_SSL_ENABLED === 'true',
};
