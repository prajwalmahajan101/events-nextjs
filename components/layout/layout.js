import { Fragment } from "react";
import MainHeader from "./main-header";
import Notification from "../ui/notification";
import useNotification from "@/hooks/useNotification";
const Layout = ({ children }) => {
	const notificationCtx = useNotification();
	const { notification } = notificationCtx;

	return (
		<Fragment>
			<MainHeader />
			<main>{children}</main>
			{notification && <Notification {...notification} />}
		</Fragment>
	);
};

export default Layout;
