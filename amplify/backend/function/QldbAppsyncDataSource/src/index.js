const {
  QldbDriver,
  TransactionExecutor,
} = require('amazon-qldb-driver-nodejs');
const { getQldbDriver } = require('./helper');

exports.handler = async (event) => {
  console.log('EVENT: ', event);

  try {
    console.log('Listing Table Names: ');
    const qldbDriver = await getQldbDriver();
    const tableNames = await qldbDriver.getTableNames();
    let response = [];
    tableNames.forEach((tableName) => {
      console.log('Table: ', tableName);
      response.push(JSON.stringify(tableName));
    });
    console.log('RESPONSE :', response);
    return response;
  } catch (e) {
    console.log('Error: Unable to create session', e);
  }
};
