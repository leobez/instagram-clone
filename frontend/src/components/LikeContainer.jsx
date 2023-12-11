import { useEffect } from "react"
import "./LikeContainer.css"

import {BsHeart, BsHeartFill} from 'react-icons/bs'

const LikeContainer = ({photo, user, handleLike}) => {

	return (
		<div className="like">

			{photo.likes && 
				<>
					{photo.likes.includes(user._id) ? (
						<BsHeartFill></BsHeartFill>
					) : (
						<BsHeart onClick={() => handleLike(photo)}></BsHeart>
					)}
					<p>{photo.likes.length} like(s) </p>
				</>
			}

		</div>
	)
}

export default LikeContainer