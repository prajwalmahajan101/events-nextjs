import EventList from "@/components/events/events-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/data/dummy_data";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";

const FilteredEventsPage = () => {
	const router = useRouter();
	const filterData = router.query.slug;

	const [loadedEvents, setLoadedEvents] = useState();

	const { data, error } = useSWR(
		"https://react-router-meetups-default-rtdb.firebaseio.com/events.json",
		(url) => fetch(url).then((res) => res.json())
	);

	useEffect(() => {
		if (data) {
			const events = [];
			for (let key in data) {
				events.push({
					id: key,
					...data[key],
				});
			}
			setLoadedEvents(events);
		}
	}, [data]);

	if (!loadedEvents) {
		return <p className="center">loading....</p>;
	}
	const filterYear = +filterData[0];
	const filterMonth = +filterData[1];
	if (
		isNaN(filterYear) ||
		isNaN(filterMonth) ||
		filterYear < 2021 ||
		filterYear > 2030 ||
		filterMonth < 1 ||
		filterMonth > 12
	) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>Invalid filter. Please adjust your Value.</p>
				</ErrorAlert>
				<div className="center">
					<Button link={"/events"}>Show All Events</Button>
				</div>
			</Fragment>
		);
	}
	const filteredEvents = loadedEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === filterYear &&
			eventDate.getMonth() === filterMonth - 1
		);
	});
	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>No events found for the chosen filter!!</p>
				</ErrorAlert>
				<div className="center">
					<Button link={"/events"}>Show All Events</Button>
				</div>
			</Fragment>
		);
	}
	const date = new Date(filterYear, filterMonth - 1);
	return (
		<Fragment>
			<ResultsTitle date={date} />
			<EventList events={filteredEvents} />
		</Fragment>
	);
};

// export const getServerSideProps = async (ctx) => {
// 	const { params } = ctx;
// 	const filterData = params.slug;
// 	if (!filterData) {
// 		return <p className="center">loading....</p>;
// 	}
// 	const filterYear = +filterData[0];
// 	const filterMonth = +filterData[1];
// 	if (
// 		isNaN(filterYear) ||
// 		isNaN(filterMonth) ||
// 		filterYear < 2021 ||
// 		filterYear > 2030 ||
// 		filterMonth < 1 ||
// 		filterMonth > 12
// 	) {
// 		return {
// 			props: {
// 				hasError: true,
// 			},
// 			// notFound: true,
// 		};
// 	}
// 	const filteredEvents = await getFilteredEvents({
// 		year: filterYear,
// 		month: filterMonth,
// 	});

// 	return {
// 		props: {
// 			filteredEvents,
// 			filterYear,
// 			filterMonth,
// 			hasError: false,
// 		},
// 	};
// };
export default FilteredEventsPage;
