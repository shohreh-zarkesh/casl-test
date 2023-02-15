import React, { Component } from 'react';

import todoStorage from '../../services/todo-storage';

import Can from '../Can';
import NewTodo from "./components/NewTodo";
import TodoFooter from "./components/TodoFooter";
import TodoListRenderer from "./components/TodoListRenderer";

export default class TodoList extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            items: todoStorage.fetch()
        };
        this._addTodo = (attrs) => {
            const todo = todoStorage.build(attrs);
            this.setState((prevState) => ({
                items: prevState.items.concat(todo)
            }));
        };
        this._removeTodo = (todo) => {
            this.setState((prevState) => ({
                items: prevState.items.filter(item => item !== todo)
            }));
        };
        this._editTodo = (todo) => {
            this.setState((prevState) => {
                const items = prevState.items.slice(0);
                const index = items.findIndex(item => item.id === todo.id);
                items.splice(index, 1, todo);
                return { items };
            });
        };
        this._completeTodo = (todo, completed) => {
            this.setState((prevState) => {
                const items = prevState.items.slice(0);
                const index = items.findIndex(item => item.id === todo.id);
                items[index] = { ...items[index], completed };
                return { items };
            });
        };
    }
    componentDidUpdate() {
        todoStorage.save(this.state.items);
    }

    render() {
        return (<div>
            <header className="header">
                <h1>Todos</h1>
                <Can do="create" on="Todo">
                    <NewTodo onNewTodo={this._addTodo}/>
                </Can>
            </header>
            <TodoListRenderer items={this.state.items} onRemove={this._removeTodo} onEdited={this._editTodo} onComplete={this._completeTodo}/>
            <TodoFooter items={this.state.items}/>
        </div>);
    }

}

