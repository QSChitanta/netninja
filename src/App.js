import './App.css';
import TripList from "./component/TripList";
import {useState} from "react";

function App() {
    const [showTrips, setShowTrips] = useState(true);

  return (
    <div className="App">
        <button onClick={() => setShowTrips(false)}>
            Hide trips
        </button>
        {showTrips && <TripList/>}
    </div>
  );
}

export default App;
