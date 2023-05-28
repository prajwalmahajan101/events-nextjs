import { createContext } from "react";

export const NotificationContext = createContext({
	notification: null,
	showNotification: (notificationData) => {},
	hideNotification: () => {},
});

const NotificationContextProvider = ({ children }) => {
	const [activeNotification, setActiveNotification] = useState();
	const showNotification = (notificationData) => {
		setActiveNotification(notificationData);
	};
	const hideNotification = () => {
		setActiveNotification(null);
	};

	const context = {
		notification: activeNotification,
		showNotification,
		hideNotification,
	};

	return (
		<NotificationContext.Provider value={context}>
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationContextProvider;
