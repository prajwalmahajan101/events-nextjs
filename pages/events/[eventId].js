import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import { getEventById } from "@/data/dummy_data";
import { useRouter } from "next/router";
import { Fragment } from "react";
const EventDetailsPage = () => {
	const router = useRouter();
	const { eventId } = router.query;
	const event = getEventById(eventId);
	if (!event) {
		return <p>No event Found</p>;
	}
	return (
		<Fragment>
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
export default EventDetailsPage;
