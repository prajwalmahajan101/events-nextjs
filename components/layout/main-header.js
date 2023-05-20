import classes from "@/styles/main-header.module.css";
import Link from "next/link";
const MainHeader = () => {
	return (
		<header className={classes.header}>
			<div className={classes.logo}>
				<Link href="/">NextEvents</Link>
			</div>
			<nav className={classes.navigation}>
				<ul>
					<li>
						<Link href="/events">Browse All Evetns</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};
export default MainHeader;
