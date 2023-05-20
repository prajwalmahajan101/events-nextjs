import EventList from "@/components/events/events-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/data/dummy_data";
import { useRouter } from "next/router";
import { Fragment } from "react";

const FilteredEventsPage = () => {
	const router = useRouter();
	const filterData = router.query.slug;
	if (!filterData) {
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
	const filteredEvents = getFilteredEvents({
		year: filterYear,
		month: filterMonth,
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
export default FilteredEventsPage;
