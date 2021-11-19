module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '4.1.4',
      skipMD5: true,
    },
    instance: {
      dbName: 'jest',
    },
    autoStart: false,
  },
  mongoURLEnvName: 'MONGODB_URI',
};
