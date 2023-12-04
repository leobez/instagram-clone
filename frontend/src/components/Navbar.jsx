import "./Navbar.css"

import {NavLink, Link} from "react-router-dom"
import {BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill} from "react-icons/bs"

const Navbar = () => {
  return (
	<nav id="nav">

		<Link to="/">ReactGram</Link>

		<form>
			<BsSearch/>
			<input type="text" />	
		</form>	

		<ul id="nav-links">
			<li>
				<NavLink to="/">
					<BsHouseDoorFill></BsHouseDoorFill>
				</NavLink>
			</li>
			<li>
				<NavLink to="/login">
					Entrar
				</NavLink>
			</li>
			<li>
				<NavLink to="/register">
					Cadastrar
				</NavLink>
			</li>
		</ul>

	</nav>
  )
}

export default Navbar