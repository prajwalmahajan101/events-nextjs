import EventFilter from "@/components/events/event-filter";
import EventList from "@/components/events/events-list";
import { getAllEvents } from "@/helper/api-helper";
import Head from "next/head";
import { useRouter } from "next/router";

const EventsPage = ({ allEvents }) => {
	const router = useRouter();
	const filterHandler = (year, month) => {
		const new_route = `/events/${year}/${month}`;
		router.push(new_route);
	};
	return (
		<div>
			<Head>
				<title>All Events</title>
				<meta
					name="description"
					content="Find a lot Of great Events that allow you to evolve ......"
				/>
			</Head>
			{/* <h1>The Events Page</h1> */}
			<EventFilter onFilterSubmit={filterHandler} />
			<EventList events={allEvents} />
		</div>
	);
};

export const getStaticProps = async () => {
	const allEvents = await getAllEvents();
	return {
		props: {
			allEvents,
		},
		revalidate: 60,
	};
};

export default EventsPage;
