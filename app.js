const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const tasks = require('./tasks');

const protoPath = 'tasks.proto';
const packageDefinition = protoLoader.loadSync(protoPath);
const taskProtoBuffer = grpc.loadPackageDefinition(packageDefinition);

const gRpcServer = new grpc.Server();

// Adição do serviço ao servidor
gRpcServer.addService(taskProtoBuffer.TaskService.service, {
  findAll: (_, callback) => {
    callback(null, { tasks });
  },
  insert(task, callback) {
    // const newTask = task.request;
    // tasks.push(newTask);
    // callback(null, { task: newTask });

    task.id = tasks.length + 1;
    tasks.push(task);
    callback(null, task);
  },
  find: (call, callback) => {
    const task = tasks.find((t) => t.id == call.request.id);
    if (task) {
      callback(null, task);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Not found',
      });
    }
  }
});

gRpcServer.bindAsync('127.0.0.1:9000', grpc.ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    console.error('Failed to bind:', error);
    return;
  }
  console.log('Server bound on port:', port);
  gRpcServer.start();
});

// gRpcServer.bind('127.0.0.1:9000', grpc.ServerCredentials.createInsecure());
// gRpcServer.start();
