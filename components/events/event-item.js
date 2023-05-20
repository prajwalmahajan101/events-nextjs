import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";

import classes from "@/styles/event-item.module.css";
import ArrowRightIcon from "../icons/arrow-right-icon";

const EventItem = ({ title, image, date, location, id }) => {
	const humanReadableDate = new Date(date).toLocaleDateString("en-us", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const formatedAddress = location.replace(", ", "\n");

	return (
		<li className={classes.item}>
			<img src={image} alt={title} />
			<div className={classes.content}>
				<div className={classes.summary}>
					<h2>{title}</h2>
					<div className={classes.date}>
						<DateIcon />
						<time>{humanReadableDate}</time>
					</div>
					<div className={classes.address}>
						<AddressIcon />
						<address>{formatedAddress}</address>
					</div>
				</div>
				<div className={classes.actions}>
					<Button link={`/events/${id}`}>
						<span>Explore Event</span>
						<span className={classes.icon}>
							<ArrowRightIcon />
						</span>
					</Button>
				</div>
			</div>
		</li>
	);
};
export default EventItem;
