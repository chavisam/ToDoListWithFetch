import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

import { List } from "./list.jsx";

//create your first component
const Home = () => {
	const [userName, setUserName] = useState("");

	return (
		<div className="text-center mt-5">
			<h1>Chavi To Do Fetch List</h1>
			<div className="row">
				<div className="col-5 mx-auto">
					<input
						type="text"
						placeholder="Please, insert your name: "
						className="form-control"
						onKeyUp={e => {
							if (e.keyCode == 13) {
								console.log("enter pressed");
								setUserName(e.target.value);
							}
						}}
					/>
				</div>
			</div>
			<p>
				<img src={rigoImage} />
			</p>
			<div className="lista">
				<List name={userName} />
			</div>
			;
		</div>
	);
};

export default Home;
