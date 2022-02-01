const config = require('../utils/config.js');
const jwt = require('jsonwebtoken');
const AuthSession = require('../models/auth-session-model.js');
var User = require('../models/user-model.js');
var Tour = require('../models/tour-model.js');


// HELPERS

const JWT_SECRET = config.JWT_SECRET;

const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET);
};

const decodeToken = (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded.id;
};

const checkIsLoggedInHelper = async (req) => {
  console.log('checkIsLoggedInHelper');
  let is_logged_in = false;
  let user_id = false;
  let token = '';
  try {
    // STEP get token from http headers
    const TOKEN_HEADER_KEY = config.TOKEN_HEADER_KEY;
    token = req.headers[TOKEN_HEADER_KEY];
    console.log('token', token);
    // find that token in loggedin sessions
    // STEP Mongoose model AuthSession reading from MongoDB
    const session = await AuthSession.findOne({ token });
    console.log('session');
    console.log(session);
    if (session && session.user_id) {
      // you are logged in
      is_logged_in = true;
      user_id = session.user_id;
    }
  } catch (err) {
    console.log('checkIsLoggedInHelper catch error');
    console.log(err);
  }
  // 
  return [is_logged_in, user_id, token];
};


// GRAPPHQL RESOLVERS

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
  rollWithArguments: (args) => {
    var output = [];
    console.log('args');
    console.log(args);
    for (var i = 0; i < args.numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (args.numSides || 6)));
    }
    return output;
  },
  testContext: (args, context) => {
    console.log('testContext(args, context) If context is not provided, the request object is passed as the context.');
    console.log('args');
    console.log(args);
    // If context is not provided, the request object is passed as the context.
    console.log('context');
    console.log(context);
    console.log('context.headers');
    console.log(context.headers);
    return 'We just tested arguments for resolver';
  },
  testResolver: (args, context, info) => {
    console.log('testResolver(args, context) If context is not provided, the request object is passed as the context.');
    console.log('args');
    console.log(args);
    console.log('context');
    console.log(context);
    console.log('info');
    console.log(info);
    return 'We just tested arguments for resolver';
  },
  reviews: (args) => {
    // dummy respone with zero reviews
    return [];
  },
  authRegister: async (args, context) => {
    console.log('authRegister resolver');
    // const req = context; // If context is not provided, the request object is passed as the context.
    const { username, password } = args;
    // STEP Mongoose model User reading from MongoDB
    const newUser = await User.create({
      username: username,
      password: password,
      activated: true
    });
    if (newUser && newUser._id) {
      return true;
    } else {
      return false;
    }
  },
  authFormLogin: async (args, context) => {
    console.log('authFormLogin resolver');
    const { username, password } = args;
    // STEP Mongoose model User reading from MongoDB
    const user = await User.findOne({ username, password });
    if (user && user._id) {
      const token = createToken(user._id);

      // STEP Mongoose model AuthSession make changes in MongoDB
      const sessionSuccess = await AuthSession.create({
        user_id: user._id,
        token
      });
      /*
      const response = res_utils.prepare_success_response({
        payload: {
          token: token,
          user: user
        }
      });
      */
      if (sessionSuccess) {
        return token;
      } else {
        return 'Sorry no token, Creating session not success';
      }
    } else {
      return 'Sorry no token, User not found. Check username and password.';
    }
  },
  authLogout: async (args, context) => {
    console.log('authLogout resolver');
    const req = context; // If context is not provided, the request object is passed as the context.
    const TOKEN_HEADER_KEY = config.TOKEN_HEADER_KEY;
    const token = req.headers[TOKEN_HEADER_KEY];
    console.log('token', token);
    const user_id = decodeToken(token);
    if (user_id) {
      // STEP Mongoose model AuthSession make changes in MongoDB
      const results = await AuthSession.deleteMany({
        user_id: user_id
      });
      console.log(results);
      // message: 'succesfuly logged out from backend'
      // now its time for frontend to delete token
      return true;
    }
  },
  myUserProfileData: async (args, context) => {
    console.log('myUserProfileData resolver');
    const req = context; // If context is not provided, the request object is passed as the context.
    const [is_logged_in, user_id, token] = await checkIsLoggedInHelper(req);
    if (is_logged_in === true) {
      // user is logged in on backend
      // const user_id = session.user_id;
      console.log('user_id');
      console.log(user_id);
      if (user_id) {
        // STEP Mongoose model User reading from MongoDB
        // const user = await User.findOne({ _id: user_id });
        const user = await User.findById(user_id);
        return user;
      }
    }
    /*
    return {
      username: mongoose_res.username,
      activated: mongoose_res.activated
    };
    */
  },
  tours: async (args, context) => {
    console.log('tours resolver');
    const req = context;
    const results = await Tour.find({});;
    console.log('mongoose results')
    console.log(results)
    return results;
  },
  tourCreate: async (args, context) => {
    console.log('tourCreate resolver');
    const req = context; // If context is not provided, the request object is passed as the context.
    // STEP check is user logged in
    const [is_logged_in, user_id, token] = await checkIsLoggedInHelper(req);
    if (is_logged_in === true) {
      // user is logged in on backend
      // STEP Mongoose model Tour make changes in MongoDB
      console.log('args');
      console.log(args);
      const newTour = await Tour.create({
        name: args.name,
        description: args.description,
        date: args.date,
        difficulty: args.difficulty,
        trail_length: args.trail_length,
        max_participants: args.max_participants,
        user_created: user_id
      });
      // success
      return true;
    }
  },
  tourUpdate: async (args, context) => {
    console.log('tourUpdate resolver');
    const req = context; // If context is not provided, the request object is passed as the context.
    // STEP check is user logged in
    const [is_logged_in, user_id, token] = await checkIsLoggedInHelper(req);
    if (is_logged_in === true) {
      // user is logged in on backend
      // STEP Mongoose model Tour make changes in MongoDB
      console.log('args');
      console.log(args);
      // STEP Mongoose model Tour make changes in MongoDB
      const results = await Tour.findOneAndUpdate({
        _id: args._id,
      }, {
        name: args.name,
        description: args.description,
        date: args.date,
        difficulty: args.difficulty,
        trail_length: args.trail_length,
        max_participants: args.max_participants
      });
      // success
      return true;
    }
  },
  tourDelete: async (args, context) => {
    console.log('tourDelete resolver');
    const req = context; // If context is not provided, the request object is passed as the context.
    // STEP check is user logged in
    const [is_logged_in, user_id, token] = await checkIsLoggedInHelper(req);
    if (is_logged_in === true) {
      // user is logged in on backend
      // const user_id = session.user_id;
      const tour_id = args.tour_id;
      // STEP Mongoose model Tour make changes in MongoDB
      const results = await Tour.findOneAndDelete({
        _id: tour_id,
        user_created: user_id
      });
      // return 'delete tour success';
      return true;
    }
  },
};



/*
  parentResolver: {
    childResolver: (obj, args, context, info) => {
      // obj is parent object
      return 'We just tested arguments for resolver';
    }
  }

  https://graphql.org/learn/execution/

  obj The previous object, which for a field on the root Query type is often not used.
  
  args The arguments provided to the field in the GraphQL query.
  
  context A value which is provided to every resolver and holds important contextual information like the currently logged in user, or access to a database.
  
  info A value which holds field-specific information relevant to the current query as well as the schema details, also refer to type GraphQLResolveInfo for more details.
*/


module.exports = root;


/*

https://bestofreactjs.com/repo/graphql-express-graphql

https://github.com/graphql/express-graphql


he graphqlHTTP function accepts the following options:

context: A value to pass as the contextValue to the execute() function from GraphQL.js/src/execute.js. If context is not provided, the request object is passed as the context.
*/


/*
test queries

{
  rollThreeDice
}

{
  rollWithArguments(numDice: 3, numSides: 6)
}
 

*/