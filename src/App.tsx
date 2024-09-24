import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { Toaster } from "./components/ui/toaster";
import { CreateOrganization } from "./routes/CreateOrganization";
import { Organizations } from "./routes/Organizations";
import { DetailOrganization } from "./routes/DetailOrganization";
import { CreateSorteo } from "./routes/CreateSorteo";
import { Sorteo } from "./routes/Sorteo";


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
          <Route path="/organization/:id" element={<DetailOrganization />} />
          <Route path="/organization/create-organization" element={<CreateOrganization />} />
          <Route path="/organization" element={<Organizations />} />
          <Route path="/organization/*" element={<OrganizationNotFound />} />
          <Route path="/sorteo/:id" element={<Sorteo />} />
          <Route path="/sorteo/create-sorteo" element={<CreateSorteo />} />
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
    <nav className="p-5">
      <ul className="flex flex-row gap-5 justify-center items-center">
        <Link to="/">
          <li className="hover:bg-slate-300 p-2 rounded-sm">
            Home
          </li>
        </Link>
        <Link to="/login">
          <li className="hover:bg-slate-300 p-2 rounded-sm">
            Login
          </li>
        </Link>
        <Link to="/organization">
          <li className="hover:bg-slate-300 p-2 rounded-sm">
            All organizations
          </li>
        </Link>
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

const OrganizationNotFound = () => {

  return (
    <div>
      <h2>Organization not found</h2>
      <p>
        <Link to="/organization">See all public organization</Link>

      </p>
      <p>
        <Link to="/organization/create-organization">Create a organization</Link>
      </p>
      <Link to="/">Go home</Link>
    </div>
  )
}