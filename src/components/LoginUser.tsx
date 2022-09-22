import { useState, useEffect } from "react";
import { IAppState } from "../utils/interfaces";
import { IUser } from "../utils/interfaces";
import { getUserList } from "../utils/getUserList";

interface LoginUserProps {
  appState: IAppState;
  setAppState: React.Dispatch<React.SetStateAction<IAppState>>;
}

function LoginUser({ appState, setAppState }: LoginUserProps): JSX.Element {
  const [selectedUserId, setSelectedUserId] = useState("");

  //get all users
  useEffect(() => {
    const getUsers = async () => {
      const listOfUsers: IUser[] = await getUserList();
      console.log(listOfUsers);
      setAppState((appState) => ({ ...appState, userList: listOfUsers }));
    };
    getUsers();
  }, [setAppState]);

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedUserId(e.target.value);
    if (selectedUserId === "") return;
    const matchingUser: IUser | undefined = appState.userList.find(
      (user) => user.userID.toString() === e.target.value
    );

    setAppState({
      ...appState,
      loggedInUser: matchingUser ? matchingUser : null,
    });
  }

  function login() {
    const matchingUser: IUser | undefined = appState.userList.find(
      (user) => user.userID.toString() === selectedUserId
    );

    setAppState({
      ...appState,
      loggedInUser: matchingUser ? matchingUser : null,
    });
  }

  function logout() {
    setAppState({ ...appState, loggedInUser: null });
    setSelectedUserId("");
  }

  return (
    <>
      <h1>
        {appState.loggedInUser
          ? "Logged in as " + appState.loggedInUser?.username
          : "You are logged out"}
      </h1>
      <select
        name="username"
        id="user-dropdown"
        onChange={handleSelect}
        value={selectedUserId}
      >
        <option value=""> Select User </option>
        {appState.userList.map((user) => {
          console.log("inside loop", user);
          return (
            <option key={user.userID} value={user.userID.toString()}>
              {user.username}
            </option>
          );
        })}
      </select>
      <button onClick={appState.loggedInUser ? logout : login}>
        {appState.loggedInUser ? "LogOut" : "Login"}
      </button>
    </>
  );
}

export default LoginUser;

// function getUsers () {
//     return mock JSON = users[]
// }