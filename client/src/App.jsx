import "./App.css";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_USERS, GET_ONE_USER } from "./query/user";
import { CREATE_USER } from "./mutations/user";

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: { id: 1 },
  });
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);

  console.log(oneUser);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data, loading]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const handleCreateUser = (evt) => {
    evt.preventDefault();
    newUser({
      variables: {
        input: { username, age },
      },
    }).then(({ data }) => {
      console.log(data);
      setUsername("");
      setAge(0);
    });
  };

  const getAllUsers = (evt) => {
    evt.preventDefault();
    refetch();
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
        />
        <input
          type="number"
          value={age}
          onChange={(evt) => setAge(Number(evt.target.value))}
        />
        <div className="btns">
          <button onClick={(evt) => handleCreateUser(evt)}>Create</button>
          <button onClick={(evt) => getAllUsers(evt)}>Get</button>
        </div>
      </form>
      <div>
        {users.map((user) => (
          <div className="user" key={user.id}>
            {user.id} {user.username} {user.age}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
