module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '165.22.126.176',
      username: 'root',
      password: 'Danimani13'
      // pem: './path/to/pem'
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    }
  },

  meteor: {
    // TODO: change app name and path
    name: 'devxop',
    path: '../',
    type: 'node',
    nodeVersion: '8.15.20',
    servers: {
      one: {},
    },
    env: {
      ROOT_URL: "http://devxop.com",
      PORT: 3000,
      MONGO_URL: 'mongodb://localhost/meteor'
    },
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },

  plugins: [ 'mup-node' ]
};
