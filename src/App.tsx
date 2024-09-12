import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import "./App.css";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { Toaster } from "./components/ui/toaster";


export default function App() {

  return (
    <div>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="home/pepe" element={<Pepe />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

const Nav = () => {

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  )
}

const Footer = () => {
  return (
    <footer>
      <h2>Footer</h2>
    </footer>
  )
}

function Layout() {
  return (
    <div className="main">
      <Nav />
      <Outlet />  {/* route active */}
      <Toaster />
      <Footer />
    </div>
  );
}



const Pepe = () => {

  return (
    <div>
      <h2>pepe</h2>
    </div>
  )
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}