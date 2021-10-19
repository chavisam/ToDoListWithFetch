import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { List } from "./list.jsx";

//create your first component
const Home = () => {
	return (
		<div className="text-center mt-5">
			<h1>Chavi To Do List</h1>
			<p>
				<img src={rigoImage} />
			</p>

			<List />
		</div>
	);
};

export default Home;
