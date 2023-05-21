import EventList from "@/components/events/events-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/helper/api-helper";
// import { useRouter } from "next/router";
import { Fragment } from "react";

const FilteredEventsPage = ({
	filteredEvents,
	filterYear,
	filterMonth,
	hasError,
}) => {
	// const router = useRouter();
	// const filterData = router.query.slug;
	// if (!filterData) {
	// 	return <p className="center">loading....</p>;
	// }
	// const filterYear = +filterData[0];
	// const filterMonth = +filterData[1];
	if (hasError) {
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

export const getServerSideProps = async (ctx) => {
	const { params } = ctx;
	const filterData = params.slug;
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
		return {
			props: {
				hasError: true,
			},
			// notFound: true,
		};
	}
	const filteredEvents = await getFilteredEvents({
		year: filterYear,
		month: filterMonth,
	});

	return {
		props: {
			filteredEvents,
			filterYear,
			filterMonth,
			hasError: false,
		},
	};
};
export default FilteredEventsPage;
