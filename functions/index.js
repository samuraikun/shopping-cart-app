/*
 * Triggers when was created new user, user account is saved Firestore.
 */
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'saveUser') {
  exports.saveUser = require('./saveUser').saveUser
}
