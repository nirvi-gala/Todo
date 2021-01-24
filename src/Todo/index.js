import React, { useState, useEffect, Component } from 'react'
import { EditIcon, DeleteIcon } from "../assets/svgs";
import "./index.css";

let array = [
	{
		name: "Add Your New Task!!",
		description: "Task Description....",
		status: "ongoing",
	}
];

class Todo extends Component {
	state = {
		enterPressed: 0
	}

	onKeyup(e) {
		if (e.keyCode === 13){
			this.setState({ enterPressed: this.state.enterPressed + 1 })
		}
	}

	componentDidMount(){
		window.addEventListener('keyup', (e) => this.onKeyup(e));
	}

	componentWillUnmount(){
		window.removeEventListener('keyup', (e) => this.onKeyup(e));
	}
	render(){
		return(
			<TodoList enterPressed={this.state.enterPressed} /> 
		)
	}
}

function TodoList({ enterPressed }) {
	const [todoValue,setTodoValue] = useState("")
	const [todoList, setTodoList] = useState(array);

	const addTodo = () => {
		let todoObj = {
			name: todoValue
		};
		todoList.push(todoObj)
		setTodoList(todoList)
		setTodoValue("")
	}

	useEffect(() => {
		if(enterPressed){
			addTodo()
		}
	}, [enterPressed]);

	const inputChange = (value) => {
		setTodoValue(value)
	}

	const taskStatusChanged = (value, i) => {
		console.log(value, i)
	}

	const editTodo = (change,i) => {
		console.log(change, i)
	}

	const displayListByStatus = (statusType) => {
		console.log(statusType)
	}

    return (
        <form className="container">
            <div className="top">
				<input className="ti" value={todoValue} onChange={(e) => inputChange(e.target.value)}/>
				<button onClick={() => addTodo()}>Add</button>
			</div>
			<div className="td-wrapper">
				{
					todoList.map((todo,i) => {
						let { name="", description="", status="ongoing" } = todo;
						let checkVal = status === "completed" ? true : false
						return(
							<div className="td">
								<input 
									className="tc"
									type="checkbox" 
									checked={checkVal} 
									onChange={(e) => taskStatusChanged(e.target.checked, i)}
								/>
								<h3 className="tn">{name}</h3>
								<button className="ic" onClick={() => editTodo(i,"edit")}><EditIcon /></button>
								<button className="ic" onClick={() => editTodo(i,"delete")}><DeleteIcon /></button>
							</div>
						)
					})
				}
			</div>
			<div className="bottom">
				<button onClick={() => displayListByStatus("all")}>All</button>
				<button onClick={() => displayListByStatus("completed")}>Completed</button>
				<button onClick={() => displayListByStatus("ongoing")}>Ongoing</button>
			</div>
        </form>
    )
}

export default Todo