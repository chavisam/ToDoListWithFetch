import React, { useState } from "react";

export const List = () => {
	const [toDo, setToDo] = useState(null);

	const [list, setList] = useState([]);
	const [count, setCount] = useState(list.length);

	const deleteTask = indexToDelete => {
		// ANOTHER POSSIBILITY TO DELETE
		// let del = [...list];
		// del.splice(indexToDelete, 1);
		// setList(del);

		setList(list.filter((e, i) => indexToDelete != i));
		setCount(list.length - 1);
	};

	let newLI = list.map((item, index) => (
		<li key={index} className="list-group-item  container ">
			<div className="row">
				<div className="col  text-start ">{item}</div>
				<div
					className="col trash  text-end"
					onClick={() => {
						console.log("deleted");
						deleteTask(index);
					}}>
					X
				</div>
			</div>
		</li>
	));

	return (
		<div className="container">
			<div className="row">
				<div className="col mx-auto">
					<input
						className=" form-control"
						type="text"
						name="list"
						id="list"
						placeholder="Next thing to Do..."
						onKeyPress={e => {
							//that means that the key pressed is intro
							e.which == 13
								? //HERE you are adding a new li to list array
								  (setList([...list, e.target.value]),
								  // here you are cleanning the input value
								  (e.target.value = null),
								  setCount(list.length + 1),
								  console.log("item added"))
								: setToDo(e.target.value);
						}}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col mx-auto">
					<ul className="list-group">{newLI}</ul>
				</div>
			</div>
			<div className="row">
				<div className="col mx-auto">
					<ul className="list-group">
						{count == 0 ? (
							<li className="list-group-item">
								No task, add a task!
							</li>
						) : (
							""
						)}
						<li className="list-group-item text-muted text-start counter">
							{count} Items left
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
