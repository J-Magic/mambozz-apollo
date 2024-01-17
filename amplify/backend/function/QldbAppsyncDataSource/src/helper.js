/*
 * Helper utility
 * This is used to get a QLDBDriver - the entry point for all interactions
 * with QLDB
 */

const { QldbDriver } = require('amazon-qldb-driver-nodejs');

/**
 * @param ledgerName The name of the ledger to create the driver on.
 * @param serviceConfigurationOptions Configurations for the AWS SDK client that the driver uses
 * @returns The driver for interacting with the specified ledger
 */

const ledgerName = process.env.LEDGER_NAME;
const serviceConfigurationOptions = {
  region: 'eu-central-1',
};
function createQldbDriver() {
  const qldbDriver = new QldbDriver(ledgerName, serviceConfigurationOptions);
  return qldbDriver;
}

const qldbDriver = createQldbDriver();

/**
 * Retrieve a driver for interacting with QLDB.
 * @returns The driver for interacting with the specified ledger.
 */

function getQldbDriver() {
  return qldbDriver;
}

module.exports = {
  createQldbDriver,
  getQldbDriver,
};
