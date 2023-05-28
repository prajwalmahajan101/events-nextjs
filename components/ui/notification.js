import { useEffect } from "react";
import useNotification from "@/hooks/useNotification";

import classes from "@/styles/notification.module.css";

function Notification(props) {
	const notificationCtx = useNotification();
	const { hideNotification, notification } = notificationCtx;

	useEffect(() => {
		if (notification && notification.status !== "pending") {
			const timer = setTimeout(() => {
				hideNotification();
			}, 3000);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [notification]);

	const { title, message, status } = props;

	let statusClasses = "";

	if (status === "success") {
		statusClasses = classes.success;
	}

	if (status === "error") {
		statusClasses = classes.error;
	}

	if (status === "pending") {
		statusClasses = classes.pending;
	}

	const activeClasses = `${classes.notification} ${statusClasses}`;

	return (
		<div className={activeClasses} onClick={hideNotification}>
			<h2>{title}</h2>
			<p>{message}</p>
		</div>
	);
}

export default Notification;
