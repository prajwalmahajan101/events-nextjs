import EventList from "@/components/events/events-list";
import { getFeaturedEvents } from "@/helper/api-helper";

const HomePage = ({ featuredEvents }) => {
	return (
		<div>
			{/* <h1>The Featured Events</h1> */}
			<EventList events={featuredEvents} />
		</div>
	);
};

export const getStaticProps = async () => {
	const featuredEvents = await getFeaturedEvents();
	return {
		props: {
			featuredEvents,
		},
		revalidate: 60,
	};
};
export default HomePage;
