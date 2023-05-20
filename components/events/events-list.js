import EventItem from "./event-item";
import classes from "@/styles/events-list.module.css";

const EventList = ({ events }) => {
	return (
		<ul className={classes.list}>
			{events.map((event) => (
				<EventItem key={event.id} {...event} />
			))}
		</ul>
	);
};

export default EventList;
