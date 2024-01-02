import {api, requestConfig} from '../utils/config'

// Register an user 
const register = async(data) => {

	const config = requestConfig("POST", data)

	try {
		const res = await fetch(api + "/users/register", config)

		const data = await res.json()

		if (data._id) {
			localStorage.setItem("user", JSON.stringify(data))
		}

		return data

	} catch (error) {
		console.log(error)
		
		if (error.message.includes("NetworkError when attempting to fetch resource")) {
			return {
				errors: ["API inativa."]
			}
		}
	}

}

// Logout an user
const logout = () => {
	localStorage.removeItem("user")
}

// Sign in an user
const login = async(data) => {

	const config = requestConfig("POST", data)

	try {
		const res = await fetch(api + "/users/login", config)

		const data = await res.json()

		if (data._id) {
			localStorage.setItem("user", JSON.stringify(data))
		}

		return data

	} catch (error) {

		console.log(error)

		if (error.message.includes("NetworkError when attempting to fetch resource")) {
			return {
				errors: ["API inativa."]
			}
		}
	}

}

const authService = {
	register,
	logout,
	login
}

export default authService