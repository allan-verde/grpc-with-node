const clientGrpc = require('./client_app');

clientGrpc.findAll({}, (error, tasks) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log('Tasks:', tasks);
});