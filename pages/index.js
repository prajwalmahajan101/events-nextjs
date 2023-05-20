import EventList from "@/components/events/events-list";
import { getFeaturedEvents } from "@/data/dummy_data";

const HomePage = () => {
	const featuredEvents = getFeaturedEvents();
	return (
		<div>
			<h1>The Featured Events</h1>
			<EventList events={featuredEvents} />
		</div>
	);
};
export default HomePage;
