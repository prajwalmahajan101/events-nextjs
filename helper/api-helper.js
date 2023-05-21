export const getAllEvents = async () => {
	try {
		let data = await fetch(
			"https://react-router-meetups-default-rtdb.firebaseio.com/events.json"
		);
		const response = await data.json();
		const events = [];
		for (let key in response) {
			events.push({
				id: key,
				...response[key],
			});
		}
		return events;
	} catch (err) {
		console.log(err);
	}
};

export async function getFeaturedEvents() {
	const events = await getAllEvents();
	return events.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
	const events = await getAllEvents();
	return events.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
	const events = await getAllEvents();
	const { year, month } = dateFilter;

	let filteredEvents = events.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === year &&
			eventDate.getMonth() === month - 1
		);
	});

	return filteredEvents;
}
