import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "@/styles/comments.module.css";
import useNotification from "@/hooks/useNotification";

import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const overide = {
	display: "block",
	margin: "150px auto",
	borderColor: "black",
};

function Comments(props) {
	const { eventId } = props;
	const { showNotification } = useNotification();

	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (showComments) {
			setLoading(true);
			fetch(`/api/comments/${eventId}`)
				.then((res) => res.json())
				.then((data) => {
					setComments(data.comments);
					setLoading(false);
				})
				.catch((err) => console.log(err));
		}
	}, [showComments]);
	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus);
	}

	function addCommentHandler(commentData) {
		// send data to API
		showNotification({
			title: "Posting the comment ....",
			message: "Your Comments is being posted",
			status: "pending",
		});
		fetch(`/api/comments/${eventId}`, {
			method: "POST",
			body: JSON.stringify(commentData),
			headers: {
				"Content-type": "application/json",
			},
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				return res.json().then((data) => {
					throw new Error(data.message || "Something went wrong");
				});
			})
			.then((data) => {
				setComments((prevState) => [data, ...prevState]);
				showNotification({
					title: "Comment Posted",
					message: "Your Comment is Posted",
					status: "success",
				});
			})
			.catch((err) =>
				showNotification({
					title: "Error!",
					message: err.message || "Something went wrong",
					status: "error",
				})
			);
	}

	return (
		<section className={classes.comments}>
			<button onClick={toggleCommentsHandler}>
				{showComments ? "Hide" : "Show"} Comments
			</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{!loading && showComments && <CommentList items={comments} />}
			{showComments && loading && (
				<ClimbingBoxLoader
					color={"#03be9f"}
					cssOverride={overide}
					loading={loading}
					size={50}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			)}
		</section>
	);
}

export default Comments;
