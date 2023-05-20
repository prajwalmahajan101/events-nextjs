import EventList from "@/components/events/events-list";
import { getAllEvents } from "@/data/dummy_data";

const EventsPage = () => {
	const allEvents = getAllEvents();
	return (
		<div>
			<h1>The Events Page</h1>
			<EventList events={allEvents} />
		</div>
	);
};
export default EventsPage;
