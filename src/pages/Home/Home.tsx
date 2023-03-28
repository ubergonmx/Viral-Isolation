import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import { useState, useEffect } from "react";

function generateCode() {
  let code = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < 4; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

function Home() {
  const socket = useSocket();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [lobbies, setLobbies] = useState([]);


  //get lobbies
  useEffect(() => {
    socket.emit("get-lobbies");
    socket.on("lobbies", (rooms: any) => {
      console.log(rooms);
      setLobbies(rooms);
    });

    // socket.emit("get-games");
    // socket.on("games", (rooms: any) => {
    //   console.log(rooms);
    //   setGames(rooms);
    // });
    


    return () => {
      socket.off("lobbies");
    }
  }, []);

  //create game
  function createGame () {
    socket.emit("create", { code: generateCode() });
    socket.on("created", (room: any) => {
      console.log(room);
      navigate("/lobby/" + room.code);
    });
  }

  return (
    <div className="home">
      {state?.error && <p>{state.error}</p>}
      <h1>Viral Isolation</h1>
      <p>Click on a house to use an item.</p>
      <p>Click on the About link to learn more.</p>

      <button onClick={createGame}>Create a new game</button>
      <br />
      <h2>Rooms</h2>
      <div className="lobbies">
        {lobbies.length > 0 && lobbies.map((room : any) => (
          <button key={room} onClick={() => navigate("/lobby/" + room)}>{room}</button>
        ))}
      </div>

    </div>
  );
}

export default Home;
