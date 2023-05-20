import EventFilter from "@/components/events/event-filter";
import EventList from "@/components/events/events-list";
import { getAllEvents } from "@/data/dummy_data";
import { useRouter } from "next/router";

const EventsPage = () => {
	const router = useRouter();
	const allEvents = getAllEvents();
	const filterHandler = (year, month) => {
		const new_route = `/events/${year}/${month}`;
		router.push(new_route);
	};
	return (
		<div>
			<h1>The Events Page</h1>
			<EventFilter onFilterSubmit={filterHandler} />
			<EventList events={allEvents} />
		</div>
	);
};
export default EventsPage;
