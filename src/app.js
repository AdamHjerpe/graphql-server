const express = require('express')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')

const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')

const app = express()

app.use(express.json())

app.use('/graphql', graphqlHttp({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true
}))

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
  }@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true`, {
    useNewUrlParser: true,
    useCreateIndex: true
  }

).then(
  app.listen(process.env.PORT || 3000),
  console.log('Up and running')
).catch(err => {
  console.error(err)
})

module.exports = app
