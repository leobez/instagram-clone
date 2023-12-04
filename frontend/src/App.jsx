import './App.css'

// Router
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

// Componentes
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

function App() {

  return (
    <div className='App'>
		<BrowserRouter>
		<Navbar/>
			<Routes>
				<Route path="/" element={<Home></Home>}></Route>
				<Route path="/login" element={<Login></Login>}></Route>
				<Route path="/register" element={<Register></Register>}></Route>
			</Routes>
			<Footer/>
		</BrowserRouter>
    </div>
  )
}

export default App
