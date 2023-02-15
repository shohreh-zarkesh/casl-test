import React, { PureComponent } from 'react';
export default class NewTodo extends PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            title: '',
            assignee: ''
        };
        this._updateTodoTitle = (event) => {
            this.setState({ title: event.target.value });
        };
        this._updateTodoAssignee = (event) => {
            this.setState({ assignee: event.target.value });
        };
        this._addTodo = (event) => {
            if (event.keyCode !== 13) {
                return;
            }
            this.props.onNewTodo({ ...this.state });
            this.setState({ title: '', assignee: '' });
        };
    }
    render() {
        return (<div className="new-todo">
            <input name="title" autoFocus autoComplete="off" placeholder="What needs to be done?" value={this.state.title} onChange={this._updateTodoTitle} onKeyUp={this._addTodo}/>

            <select name="assignee" value={this.state.assignee} onChange={this._updateTodoAssignee}>
                <option value="" disabled>Choose Assignee</option>
                <option>me</option>
                <option>homa</option>
                <option>arezo</option>
            </select>
        </div>);
    }
}
