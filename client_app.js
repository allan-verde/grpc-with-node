const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const protoPath = 'tasks.proto';
const packageDefinition = protoLoader.loadSync(protoPath);
const taskProtoBuffer = grpc.loadPackageDefinition(packageDefinition);

const clientGrpc = new taskProtoBuffer.TaskService(
  '127.0.0.1:9000',
  grpc.credentials.createInsecure()
);

module.exports = clientGrpc;