import { useRouter } from "next/router";
const EventDetailsPage = () => {
	const router = useRouter();
	const { eventId } = router.query;
	return (
		<div>
			<h1>The Event Details - {eventId}</h1>
		</div>
	);
};
export default EventDetailsPage;
