feature/frontend
const mongoose = require('mongoose');

const authSessionSchema = new mongoose.Schema({
    user_id: String,
    token: String
}, { collection: 'auth_session' });

const AuthSession = mongoose.model('auth_session', authSessionSchema);


const mongoose = require('mongoose');

const authSessionSchema = new mongoose.Schema({
    user_id: String,
    token: String
}, { collection: 'auth_session' });

const AuthSession = mongoose.model('auth_session', authSessionSchema);

main
module.exports = AuthSession;