import useNotification from "@/hooks/useNotification";
import classes from "@/styles/newsletter-registration.module.css";
import { useRef } from "react";

function NewsletterRegistration() {
	const notificationCtx = useNotification();
	const { showNotification } = notificationCtx;

	const emailRef = useRef();
	function registrationHandler(event) {
		event.preventDefault();
		showNotification({
			title: "Signing You up ......",
			message: "Registering for the newsletter",
			stautus: "pending",
		});

		const email = emailRef.current.value;

		fetch("/api/newsletter", {
			method: "POST",
			body: JSON.stringify({ email }),
			headers: {
				"Content-Type": "application/json",
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
				showNotification({
					title: "Success!",
					message: "Successfully Register for the newsletter.",
					status: "success",
				});
			})
			.catch((err) => {
				showNotification({
					title: "Error!",
					message: err.message || "Something went wrong",
					status: "error",
				});
			});

		// fetch user input (state or refs)
		// optional: validate input
		// send valid data to API
	}

	return (
		<section className={classes.newsletter}>
			<h2>Sign up to stay updated!</h2>
			<form onSubmit={registrationHandler}>
				<div className={classes.control}>
					<input
						type="email"
						id="email"
						placeholder="Your email"
						aria-label="Your email"
						ref={emailRef}
					/>
					<button>Register</button>
				</div>
			</form>
		</section>
	);
}

export default NewsletterRegistration;
