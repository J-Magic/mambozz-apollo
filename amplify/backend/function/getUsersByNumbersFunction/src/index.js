const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const ddbclient = new DynamoDBClient({ region: 'eu-central-1' });

exports.handler = async (event) => {
  console.log('EVENT:', event);
  console.log('ARGUMENTS :', event.arguments.numbers);
  try {
    const contactsToCompare = event.arguments.numbers;
    const formattedContactsToCompare = [];

    for (let i = 0; i < contactsToCompare.length; i++) {
      formattedContactsToCompare.push(contactsToCompare[i].number);
    }

    console.log('FORMATED NUMBERS :', formattedContactsToCompare);

    const params = {
      TableName: 'User-62ctpxxp6ja5bikqnpnlpikpmq-dev',
      ProjectionExpression:
        'id,username, chatImage, chatStatus, email, publicKey, phoneNumber, chatRooms, createdAt, updatedAt',
    };

    // Scan the DynamoDB table
    const scanCommand = new ScanCommand(params);
    const scanResult = await ddbclient.send(scanCommand);
    console.log('SCAN RESULT: ', scanResult);

    // Filter user records with matching phone numbers
    const matchingUsers = scanResult.Items.filter((user) => {
      console.log('USER:', user.phoneNumber.S);
      const userPhoneNumber = user.phoneNumber.S; // Assuming phoneNumber is a string attribute
      const matchingContact = formattedContactsToCompare.includes(
        userPhoneNumber.toString()
      );
      console.log('Matching Contact: ', matchingContact);

      return matchingContact;
    });

    // Log or process the matching user records
    console.log('Matching Users:', matchingUsers);

    // return matchingUsers;
    return matchingUsers.map((item) => {
      const user = {};
      for (const key in item) {
        user[key] = item[key].S;
      }
      return user;
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};
