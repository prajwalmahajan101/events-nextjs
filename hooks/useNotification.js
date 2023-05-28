const { NotificationContext } = require("@/store/notification-context");
const { useContext } = require("react");

const useNotification = () => {
	const NotificationCtx = useContext(NotificationContext);
	return NotificationCtx;
};

export default useNotification;
