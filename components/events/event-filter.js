import { useRef } from "react";
import Button from "../ui/button";
import classes from "@/styles/event-filter.module.css";

const EventFilter = ({ onFilterSubmit }) => {
	const yearRef = useRef();
	const monthRef = useRef();

	const filterSumbitHandler = (event) => {
		event.preventDefault();
		let selectedYear = yearRef.current.value;
		let selectedMonth = monthRef.current.value;

		onFilterSubmit(selectedYear, selectedMonth);
	};
	return (
		<form className={classes.form}>
			<div className={classes.controls}>
				<div className={classes.control}>
					<label htmlFor="year">Year</label>
					<select id="year" ref={yearRef}>
						<option value="2021">2021</option>
						<option value="2022">2022</option>
					</select>
				</div>
				<div className={classes.control}>
					<label htmlFor="month">Year</label>
					<select id="month" ref={monthRef}>
						<option value="1">January</option>
						<option value="2">February</option>
						<option value="3">March</option>
						<option value="4">April</option>
						<option value="5">May</option>
						<option value="6">June</option>
						<option value="7">July</option>
						<option value="8">August</option>
						<option value="9">September</option>
						<option value="10">October</option>
						<option value="11">November</option>
						<option value="12">December</option>
					</select>
				</div>
			</div>
			<Button clickHandler={filterSumbitHandler}>Find Event</Button>
		</form>
	);
};
export default EventFilter;
