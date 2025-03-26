import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import TaskPage from "./pages/TaskPage";
import TimeTracker from "./pages/TimeTracker";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/time-tracker" element={<TimeTracker />} />
      </Route>
    </Routes>
  );
}

export default App;
