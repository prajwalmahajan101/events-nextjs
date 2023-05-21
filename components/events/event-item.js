import Image from "next/image";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

import classes from "@/styles/event-item.module.css";

const EventItem = ({ title, image, date, location, id }) => {
	const humanReadableDate = new Date(date).toLocaleDateString("en-us", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const formatedAddress = location.replace(", ", "\n");

	return (
		<li className={classes.item}>
			<Image src={image} alt={title} width={360} height={160} />
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
