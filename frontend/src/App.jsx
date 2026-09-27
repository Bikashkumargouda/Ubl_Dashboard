import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import TrainingSessions from "./pages/TrainingSessions";
import NewTrainingSession from "./pages/NewTrainingSession";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<Layout />}>

          {/* Dashboard */}

          <Route
            path="/"
            element={<Dashboard />}
          />


          {/* Training Sessions */}

          <Route
            path="/sessions"
            element={<TrainingSessions />}
          />


          {/* New Training Session */}

          <Route
            path="/new-session"
            element={<NewTrainingSession />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;