const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema");
let users = [
  { id: 1, username: "John Doe", age: 18 },
  { id: 2, username: "Jill Doe", age: 25 },
];
const users2 = users.filter((user) => user.id !== 2);
console.log(users);

const createUser = (input) => {
  const id = Date.now();
  return {
    id,
    ...input,
  };
};

const root = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    const userId = typeof id === "string" ? parseInt(id, 10) : id;
    return users.find((user) => user.id === userId);
  },
  createUser: ({ input }) => {
    const user = createUser(input);
    users.push(user);
    return user;
  },
  deleteUser: ({ id }) => {
    const userId = typeof id === "string" ? parseInt(id, 10) : id;

    users = users.filter((user) => user.id !== userId);
    console.log(users);
    return userId;
  },
};

const app = express();
app.use(cors());

app.use("/graphql", graphqlHTTP({ graphiql: true, schema, rootValue: root }));

app.listen(8000, () => console.log("server started on port 8000"));
