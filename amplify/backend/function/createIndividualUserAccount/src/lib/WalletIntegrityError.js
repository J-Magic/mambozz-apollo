/**
 * Custom error when there is an issue withthe details passed in
 */

class WalletIntegrityError extends Error {
  constructor(status, message, description) {
    super(message);
    this.status = status;
    this.description = description;
  }

  getHttpResponse() {
    const responseBody = {
      status: this.status,
      title: this.message,
      detail: this.description,
    };

    return {
      statusCode: this.status,
      body: JSON.stringify(responseBody),
    };
  }
}

module.exports = WalletIntegrityError;
