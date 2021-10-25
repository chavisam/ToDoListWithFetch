import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { Users } from "./users.jsx";

export const ApiTest = () => {
	const [users, setUsers] = useState(null);

	//this create the user at the api
	useEffect(() => {
		console.log("solo al inicio");

		fetch("https://gorest.co.in/public/v1/users", {
			method: "GET"
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				//console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(result => {
				console.log(result);
				setUsers(result.data);
				console.log(users);
			})

			.catch(error => {
				console.error(error);
			});
	}, []);

	return (
		<div className="container">
			<div className="row">
				<Users arrUsers={users} />
			</div>
		</div>
	);
};
