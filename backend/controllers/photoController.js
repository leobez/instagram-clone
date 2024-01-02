const Photo = require("../models/Photo")
const User = require("../models/User")

const mongoose = require("mongoose")

// Insert a photo, with an user related to it
const insertPhoto = async(req, res) => {
	const {title} = req.body
	const image = req.file.filename

	const reqUser = req.user

	const user = await User.findById(reqUser._id)

	// Create photo
	const newPhoto = await Photo.create({
		image, 
		title,
		userId: user._id,
		userName: user.name
	}) 

	// if photo was created, return data
	if (!newPhoto) {
		res.status(422).json({
			errors: ["Houve um erro, tente novamente mais tarde."]
		})
	}

	res.status(201).json(newPhoto)
} 

// Remove a photo from DB
const deletePhoto = async(req, res) => {

	const {id} = req.params
	const reqUser = req.user

	try {
		const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

		// Check if photo exists
		if (!photo) {
			res.status(404).json({
				errors: ["Foto não encontrada."]
			})
			return
		}

		// Check if photo belongs to user
		if (!photo.userId.equals(reqUser._id)) {
			res.status(422).json({
				errors : ["Erro. Tente novamente mais tarde."]
			})
			return
		}

		await Photo.findByIdAndDelete(photo._id)

		res.status(200).json({
			id: photo._id,
			message: "Foto excluida com sucesso."
		})

	} catch (error) {
		res.status(422).json({
			errors : ["Erro. Id invalido."]
		})
		return
	}
}

// Get all photos
const getAllPhotos = async(req, res) => {

	try {

		const photos = await Photo.find({}).sort(
			[["createdAt", -1]]
		).exec()

		res.status(200).json(photos)

	} catch (error) {
		
		res.status(404).json({
			errors : ["Erro. Algo deu erradoo"]
		})

	}

}

// Get user photos
const getUserPhotos = async(req, res) => {
	const {id} = req.params

	try {
		const photos = await Photo.find({userId: id}).sort([['createdAt', -1]]).exec()
		res.status(200).json(photos)
	} catch (error) {
		res.status(404).json({
			errors : ["Erro. Algo deu errado"]
		})
		return
	}

}

// Get photo by id
const getPhotoById = async(req, res) => {
	console.log("chegou")
	const {id} = req.params

	try {
		const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

		// Check if photo exists
		if (!photo) {
			res.status(404).json({
				errors: ["Foto não encontrada."]
			})
			return
		}

		res.status(200).json(photo)

	} catch (error) {
		res.status(422).json({
			errors: ["Algo deu errado."]
		})
		return
	}

}

// Update a photo
const updatePhoto = async(req, res) => {

	const {id} = req.params
	const {title} = req.body

	const reqUser = req.user

	try {
		const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

		// Check if photo exists
		if (!photo) {
			res.status(404).json({
				errors: ["Foto não encontrada."]
			})
			return
		}

		// Check if photo belongs to user
		if (!photo.userId.equals(reqUser._id)) {
			res.status(422).json({
				errors: ["Ocorreu um erro, por favor tente novamente mais tarde"]
			})
			return
		}

		if (title) {
			photo.title = title
		}

		await photo.save()

		res.status(200).json({photo, message: "Foto atualizada com sucesso."})

	} catch (error) {
		res.status(422).json({
			errors: ["Algo deu errado."]
		})
		return
	} 

}

// Like
const likePhoto = async(req, res) => {

	const {id} = req.params
	const reqUser = req.user

	try {
		const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

		// Check if photo exists
		if (!photo) {
			res.status(404).json({
				errors: ["Foto não encontrada."]
			})
			return
		}

		// Check if user alreadt liked the photo
		if (photo.likes.includes(reqUser._id)) {
			res.status(422).json({
				errors: ["Voce já curtiu a foto"]
			})
			return
		}

		// Put user id in likes array
		photo.likes.push(reqUser._id)

		photo.save()

		res.status(200).json({
			photoId: id, userId: reqUser._id, message: "Foto curtida com sucesso."
		})

	} catch (error) {
		res.status(422).json({
			errors: ["Algo deu errado."]
		})
		return
	} 
}

// Comment
const commentPhoto = async(req, res) => {
	const {id} = req.params
	const {comment} = req.body
	const reqUser = req.user

	try {
		const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id))
		const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

		// Check if photo exists
		if (!photo) {
			res.status(404).json({
				errors: ["Foto não encontrada."]
			})
			return
		}

		// Put comment in array of comments
		const userComment = {
			comment, 
			userName: user.name,
			userImage: user.profileImage,
			userId: user._id
		}

		photo.comments.push(userComment)

		await photo.save()

		res.status(200).json({
			comment: userComment, message: "Comentário adicionado com sucesso."
		})

	} catch (error) {
		res.status(422).json({
			errors: ["Algo deu errado."]
		})
		return
	} 
}

// Search photos by title
const searchPhotos = async(req, res) => {
	
	const {q} = req.query

	const photos = await Photo.find({title: new RegExp(q, "i")}).exec()

	res.status(200).json(photos)
}


module.exports = {
	insertPhoto,
	deletePhoto,
	getAllPhotos,
	getUserPhotos,
	getPhotoById,
	updatePhoto,
	likePhoto,
	commentPhoto,
	searchPhotos
}