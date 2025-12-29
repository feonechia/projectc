import { NavLink, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import Home from "./components/home/Home";
import Layout from "./layout/Layout";
import AppRouter from "./router/AppRouter";


function App() {
  return (

    <div className="App">
      <Router>
        <Layout>
          <AppRouter />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
