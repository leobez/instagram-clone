import "./Photo.css"

import { uploads } from "../../utils/config";

// components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhotoById, like, comment } from "../../slices/photoSlice"

const Photo = () => {

	const {id} = useParams()

	const dispatch = useDispatch()

	const {user} = useSelector(state => state.auth)
	const {photo, loading, error, message} = useSelector(state => state.photo)

	const resetMessage = useResetComponentMessage(dispatch)

	const [commentText, setCommentText] = useState("")

	// Load photo data
	useEffect(() => {
		dispatch(getPhotoById(id))	
	}, [dispatch, id])

	// Insert a like
	const handleLike = () => {
		dispatch(like(photo._id))
		resetMessage()
	}

	// Insert a comment
	const handleComment = (e) => {
		e.preventDefault()

		const commentData = {
			comment: commentText,
			id: photo._id
		}

		dispatch(comment(commentData))
		setCommentText("")
		resetMessage()
	}

	if (loading) {
		return <p>Carregando...</p>
	}

	return (
		<div id="photo">
			<PhotoItem photo={photo}></PhotoItem>
			<LikeContainer photo={photo} user={user} handleLike={handleLike}></LikeContainer>
			<div className="message-container">
				{error && <Message msg={error} type="error"></Message>}
				{message && <Message msg={message} type="success"></Message>}
			</div>
			
			{photo.comments &&

				<div className="comments">
				<h3>Comentários: ({photo.comments.length})</h3>
				<form onSubmit={handleComment}>
					<input type="text" placeholder="Inisra o seu comentário" onChange={(e) => setCommentText(e.target.value)} value={commentText || ""} />
					<input type="submit" value="Enviar" />
				</form>
				{photo.comments.length === 0 && <p>Não há comentários.</p>}
				{photo.comments.map(comment => (
					<div className="comment" key={comment.comment}>
						<div className="author">
							{comment.userImage && (
								<img src={`${uploads}/users/${comment.userImage}`} alt={comment.userName} />
							)}
							<Link to={`/users/${comment.userId}`}>
								<p>{comment.userName}</p>
							</Link>
						</div>
						<p>{comment.comment}</p>
					</div>
				))}
				</div>
			}
		</div>
	)
}

export default Photo