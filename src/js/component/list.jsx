import React, { useState } from "react";
import swal from "sweetalert";
export const List = () => {

    const [list, setList] = useState([]);
    const [count, setCount] = useState(list.length);

	const updateAPI = (sucessCallBack, failureCallBack) => {
		
		//REST
		fetch('https://assets.breatheco.de/apis/fake/todos/user/alesanchezr', {
			method: "PUT",
			body: JSON.stringify(list),
			headers: {
				"Content-Type": "application/json"
			}
			})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				sucessCallBack();
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				failureCallBack(error);
				console.log(error);
			});

	}

    const addTask = (toDo) => {

		//actualizar datos en la API
		updateAPI(() => {

			//api OK

			//agregar el item localmente
			setList(...list,toDo);
			setCount(list.length);

		}, (error) => {

			//api WRONG
			swal('api failed: '+error);

		});

    };

    const deleteTask = indexToDelete => {
        // ANOTHER POSSIBILITY TO DELETE
        // let del = [...list];
        // del.splice(indexToDelete, 1);
        // setList(del);

		//actualizar datos en la API
		updateAPI(() => {

			//API OK
			//eliminar el item localmente
			setList(list.filter((e, i) => indexToDelete != i));
			setCount(list.length);

		}, (error) => {

			//API WRONG
			swal('API FAILED: '+error);

		});
		
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
                        onKeyUp={e => {
                            //that means that the key pressed is intro
                            if(e.keyCode==13){
                                // comprobar que no está vacío
                                if(!e.target.value){
                                    //comprobar si el valor existe
                                    list.indexOf(e.target.value) !=-1
                                    ? addTask(e.target.value)
                                    : swal('ya existe');
                                }else{
                                    swal('Está vacío')
                                }
                            }
                        }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col mx-auto">
                    <ul className="list-group">{newLI}</ul>
                </div>
            </div>
            {/* this is the list counter */}
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