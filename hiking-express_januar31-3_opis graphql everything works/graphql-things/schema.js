var { buildSchema } = require('graphql');

// graphql
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type User {
    _id: String
    username: String
    activated: Boolean
  }

  type Tour {
    _id: String
    name: String
    description: String
    date: String
    difficulty: String
    trail_length: Int
    max_participants: Int
    user_created: String
    date_created: String
  }

  type Review {
    user: String,
    tour: String,
    rating: Float,
    review: String,
    createdAt: String
  }

  type Query {
    hello: String
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
    rollWithArguments(numDice: Int!, numSides: Int): [Int]
    testContext(something: String): String
    testResolver: String
    authFormRegister(username: String, password: String): String
    authRegister(username: String, password: String): Boolean
    authFormLogin(username: String, password: String): String
    authLogout(something: String): Boolean
    myUserProfileData: User
    tourCreate(name: String, description: String, date: String, difficulty: String, trail_length: Int, max_participants: Int): Boolean
    tourUpdate(_id: String, name: String, description: String, date: String, difficulty: String, trail_length: Int, max_participants: Int): Boolean
    tourDelete(tour_id: String): Boolean
    tours(something: String): [Tour]
    reviews(something: String): Boolean
  }
`);

module.exports = schema;

/*
tours: [Tour]
reviews: [String]
*/