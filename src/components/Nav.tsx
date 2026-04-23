import { NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="site-nav">
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        Home
      </NavLink>
      <NavLink
        to="/writing"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        Writing
      </NavLink>
      <NavLink
        to="/travel"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        Travel
      </NavLink>
      <NavLink
        to="/strava"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        Strava
      </NavLink>
    </nav>
  )
}
