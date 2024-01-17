const { getQldbDriver } = require('./connectToLedger');
const WalletNotFoundError = require('../lib/WalletNotFoundError');
const WalletIntegrityError = require('../lib/WalletIntegrityError');

// Check if userId already exists
async function checkUserId(txn, userId) {
  const query = 'SELECT UserID FROM Individual_User AS u WHERE u.UserID = ?';
  let recordsReturned;

  await txn.execute(query, userId).then((result) => {
    recordsReturned = result.getResultList().length;
    if (recordsReturned === 0) {
      console.log(`No records found for ${userId}`);
    } else {
      console.log(`Records already exist for ${userId}`);
    }
  });
  return recordsReturned;
}

// Insert new wallet creation document to the Individual_User Table

async function createNewUserWallet(txn, walletDoc) {
  const statement = 'INSERT INTO Individual_User ?';
  return txn.execute(statement, walletDoc);
}

// Add Unique ID from QLDB
async function addUniqueQLDBID(txn, id, userId) {
  const statement =
    'UPDATE Individual_User as u SET u.ID = ? WHERE u.UserID = ?';
  return txn.execute(statement, id, userId);
}

// Creates a new Individual_User record in the QLDB Ledger

const createIndividualUser = async (userId) => {
  let user;
  // Get qldb driver instance
  const qldbDriver = await getQldbDriver();
  await qldbDriver.executeLambda(async (txn) => {
    // Check if record already exists
    console.log('Execution of with QLDB Driver started');
    const recordsReturned = await checkUserId(txn, userId);
    if (recordsReturned === 0) {
      const walletDoc =
        // [
        {
          userId,
        };
      // ];
      // Create the record. This returns the unique document ID in an array as the result set
      const result = await createNewUserWallet(txn, walletDoc);
      const docIdArray = result.getResultList();
      const docId = docIdArray[0].get('documentId').stringValue();

      // Update the user record to add the  docId/UniqueQLDBID as the ID
      await addUniqueQLDBID(txn, docId, userId);
      user = {
        ID: docId,
        UserID: userId,
      };
    } else {
      throw new WalletIntegrityError(
        400,
        'Wallet Integrity Error',
        `Wallet record with UserID ${userId}
    already exists. No new record created`
      );
    }
  });
  return user;
};

// Helper function to get the latest revision of document by UserID

async function getUserRecordByUserID(txn, userId) {
  const query = 'SELECT * FROM Individual_User AS u WHERE u.UserID = ? ';
  return txn.execute(query, userId);
}
// Helper function to get the latest revision of document by document Id

async function getUserRecordById(txn, id) {
  const query = 'SELECT * FROM Individual_User as u WHERE u.ID = ? ';
  return txn.execute(query, id);
}

// Helper function to update the document with a new deposit and transaction details
async function individualUserDeposit(txn, amount, transaction, userId) {
  const statement =
    'UPDATE Individual_User as u SET u.currentBalance = ?, u.transactions= ?, WHERE u.UserID';
  return txn.execute(statement, amount, transaction, userId);
}

const updateIndividualUser = async (userId, TransactionInfo) => {
  let user;

  // Get a Qldb Driver instance
  const qldbDriver = await getQldbDriver();
  await qldbDriver.executeLambda(async (txn) => {
    // Get current record
    const result = await getUserRecordByUserID(txn, userId);
    const resultList = result.getResultList();

    if (resultList.length === 0) {
      throw new WalletIntegrityError(
        400,
        'Wallet Integrity Error',
        `Wallet record with UserID ${userId}
    already exists. No new record created`
      );
    } else {
      const originalUser = JSON.stringify(resultList[0]);
      const newUser = JSON.parse(originalUser);
      const originalBalance = newUser.currentBalance;

      const transactionAmount = TransactionInfo.transactionAmount;

      let newBalance = null;
      if (TransactionInfo.type === 'DEPOSIT') {
        newBalance = originalBalance + transactionAmount;
      }

      const { transactions } = newUser;
      transactions.unshift(TransactionInfo);
      await individualUserDeposit(txn, newBalance, transactions, userId);
      user = {
        userId,
        currentBalance: newBalance,
      };
    }
  });
  return user;
};

// Helper function to retrieve the current state of a user record

const getUser = async (id) => {
  let user;

  // Get a Qldb Driver instance
  const qldbDriver = await getQldbDriver();
  await qldbDriver.executeLambda(async (txn) => {
    // Get the current record
    const result = await getUserRecordById(txn, id);
    const resultList = result.getResultList();

    if (resultList.length === 0) {
      throw new WalletNotFoundError(
        400,
        'Wallet Not Found  Error',
        `User record with Id ${id} does not exist`
      );
    } else {
      user = JSON.stringify(resultList[0]);
    }
  });
  return user;
};

module.exports = {
  createIndividualUser,
  updateIndividualUser,
  getUser,
};
