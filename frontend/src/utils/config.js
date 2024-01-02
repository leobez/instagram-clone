/* export const api = "http://localhost:5000/api" */
export const api = `https://akita-next-promptly.ngrok-free.app/api`
export const uploads = "https://akita-next-promptly.ngrok-free.app/uploads"

export const requestConfig = (method, data, token=null, image=null) => {

	let config

	if (image) {
		config = {
			method,
			body: data,
			headers: {}
		}
	} else if (method === "DELETE" || data === null) {
		config = {
			method, 
			headers: {
				"ngrok-skip-browser-warning": true,
			}
		}
	} else {
		config = {
			method,
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		}
	}

	config.headers["ngrok-skip-browser-warning"] = true

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
}