/**
 * Lambda function that implements creation of IndividualUser Wallet Functionality
 */
// import { createIndividualUser } from './helper/userWallet';
const { createIndividualUser } = require('./helper/userWallet');
const WalletIntegrityError = require('./lib/WalletIntegrityError');
exports.handler = async (event) => {
  console.log('EVENT: ', event);
  console.log('EVENT.ARGUMENTS.USERID', event.arguments.UserID);
  // const UserID = JSON.parse(event.arguments.UserID);
  const UserID = event.arguments.UserID;

  try {
    const response = await createIndividualUser(UserID);
    console.log('RESPONSE FROM CREATEINDIVIDUALUSER :', response);

    // return {
    //   statusCode: 201,
    //   // body: JSON.stringify(response),
    //   response,
    // };
    return response;
  } catch (e) {
    if (error instanceof WalletIntegrityError) {
      return error.getHttpResponse();
    }
    const errorBody = {
      status: 500,
      title: error.name,
      detail: error.message,
    };
    return {
      statusCode: 500,
      body: JSON.stringify(errorBody),
    };
  }
};
