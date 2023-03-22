import { useParams } from "react-router-dom";

function Lobby() {
  const { id } = useParams();
  return (
    <div>
      <h1>Lobby</h1>
    </div>
  );
}

export default Lobby;
