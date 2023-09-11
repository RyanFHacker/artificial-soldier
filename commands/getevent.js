// const { GraphQLClient, gql } = require('graphql-request');
const { request, gql, GraphQLClient } = require('graphql-request')
const config = require("../prodConfig.json");


const endpoint = `https://api.start.gg/gql/alpha`
const { SlashCommandBuilder } = require("discord.js");

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${config.REACT_APP_SMASHGG_PERSONAL_ACCESS_TOKEN}`,
  },
})

const query = gql`
query EventSets($eventId: ID!, $page: Int!, $perPage: Int!) {
  event(id: $eventId) {
    id
    name
    sets(
      page: $page
      perPage: $perPage
      sortType: STANDARD
    ) {
      pageInfo {
        total
      }
      nodes {
        id
        slots {
          id
                standing {
        id
        placement
        stats {
          score {
            label
            value
          }
        }
      }
          entrant {
            id
            name
          }
        }
      }
    }
  }
},
`;

const variables = {
    eventId:563107,
    page: 1,
    perPage: 50
}

module.exports = {
    data : new SlashCommandBuilder()
      .setName("getevent")
      .setDescription(
        "Get an event"
    ),
    async execute() {
      const data = await graphQLClient.request(query, variables)
      console.log(data)
    }
}