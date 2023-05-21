import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import ErrorAlert from "@/components/ui/error-alert";
import { getEventById, getFeaturedEvents } from "@/helper/api-helper";
import Head from "next/head";
// import { useRouter } from "next/router";
import { Fragment } from "react";
const EventDetailsPage = ({ event }) => {
	// const router = useRouter();
	// const { eventId } = router.query;
	// const event = getEventById(eventId);
	if (!event) {
		return (
			<ErrorAlert>
				<p>No event Found</p>
			</ErrorAlert>
		);
	}
	return (
		<Fragment>
			<Head>
				<title>{event.title}</title>
				<meta name="description" content={event.description} />
			</Head>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</Fragment>
	);
};

export const getStaticProps = async (ctx) => {
	const { params } = ctx;
	const { eventId } = params;
	const event = (await getEventById(eventId)) || null;
	return {
		props: {
			event,
		},
		revalidate: 30,
	};
};

export const getStaticPaths = async () => {
	let events = await getFeaturedEvents();
	const paths = events.map((event) => ({ params: { eventId: event.id } }));
	return {
		paths,
		fallback: "blocking",
	};
};
export default EventDetailsPage;
