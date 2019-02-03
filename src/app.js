const express = require('express')
const graphqlHttp = require('express-graphql')
const app = express()
const { buildSchema } = require('graphql')
app.use(express.json())

app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type RootQuery {
      events: [String!]!
    }
    type RootMutation {
      createEvent(name: String): String
    }
    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return ['1', '2', '3']
    },
    createEvent: (args) => {
      const eventName = args.name
      return eventName
    }
  },
  graphiql: true
}))

app.listen(3000)

module.exports = app
