const aws = require('aws-sdk');
const ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {
  if (!event.request.userAttributes.sub) {
    console.log('Error: No user was written to DynamoDB');
    context.done(null, event);
    return;
  }

  // Save the user to dynamoDB
  const date = new Date();
  const params = {
    Item: {
      id: { S: event.request.userAttributes.sub },
      owner: { S: event.request.userAttributes.sub },
      __typename: { S: 'User' },
      username: { S: event.userName },
      email: { S: event.request.userAttributes.email },
      phoneNumber: { S: event.request.userAttributes.phone_number },
      createdAt: { S: date.toISOString() },
      updatedAt: { S: date.toISOString() },
    },
    TableName: process.env.USERTABLE,
  };

  try {
    await ddb.putItem(params).promise();
    console.log('Success');
    console.log('Event:', event.request.userAttributes);
  } catch (e) {
    console.log('Error', e);
  }

  context.done(null, event);
};
