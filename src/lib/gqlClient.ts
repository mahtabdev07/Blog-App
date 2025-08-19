import { GraphQLClient } from "graphql-request";

const endpoint =
  process.env.NODE_ENV === "production"
    ? "https://blog-app-graph-ql-phi.vercel.app/api/graphql"
    : "http://localhost:3000/api/graphql";

export const gqlClient = new GraphQLClient(endpoint);

export async function gqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>
) {
  try {
    return await gqlClient.request<T>(query, variables);
  } catch (error) {
    console.error("GraphQL request failed:", error);
    throw error;
  }
}
