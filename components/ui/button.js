import Link from "next/link";
import classes from "@/styles/button.module.css";

const Button = ({ link, clickHandler, children }) => {
	if (link) {
		return (
			<Link href={link} className={classes.btn}>
				{children}
			</Link>
		);
	}
	return (
		<button className={classes.btn} onClick={clickHandler}>
			{children}
		</button>
	);
};

export default Button;
