import Head from "next/head";
import EventList from "@/components/events/events-list";
import { getFeaturedEvents } from "@/helper/api-helper";
import NewsletterRegistration from "@/components/input/newsletter-registration";

const HomePage = ({ featuredEvents }) => {
	return (
		<div>
			<Head>
				<title>NextJs Events</title>
				<meta
					name="description"
					content="Find a lot Of great Events that allow you to evolve ......"
				/>
			</Head>
			{/* <h1>The Featured Events</h1> */}
			<NewsletterRegistration />
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
