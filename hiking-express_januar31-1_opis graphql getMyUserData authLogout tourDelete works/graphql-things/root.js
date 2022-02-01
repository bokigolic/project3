const config = require('../utils/config.js');
const jwt = require('jsonwebtoken');
const AuthSession = require('../models/auth-session-model.js');
var User = require('../models/user-model.js');
var Tour = require('../models/tour-model.js');

const authController = require('../controllers/auth-controller.js');
const tourController = require('../controllers/tour-controller.js');

const JWT_SECRET = config.JWT_SECRET;

const decodeToken = (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded.id;
};


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
  reviews: () => {
    return [];
  },
  authLogout: async (args, context) => {
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
    const [is_logged_in, user_id, token] = await authController.checkIsLoggedInHelper(req);
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
    console.log(mongoose_res)
    return {
      username: mongoose_res.username,
      activated: mongoose_res.activated
    };
  },
  tourDelete: async (args, context) => {
    console.log('tourDelete resolver');
    const req = context; // If context is not provided, the request object is passed as the context.
    const [is_logged_in, user_id, token] = await authController.checkIsLoggedInHelper(req);
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