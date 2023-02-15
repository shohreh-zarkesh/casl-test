import React, { Component } from 'react';
import Can, { AbilityContext } from '../../../../../Can';
;
let TodoItem = (() => {
    class TodoItem extends Component {
        constructor() {
            super(...arguments);
            this.state = {
                editingTitle: '',
                isEditing: false,
            };
            this._doneEdit = () => {
                if (!this.state.isEditing) {
                    return;
                }
                if (!this.refs.editInput.value) {
                    this._removeTodo();
                }
                else {
                    this.props.onEdited({ ...this.props.todo, title: this.refs.editInput.value });
                }
                this._cancelEdit();
            };
            this._doneOrCancelEdit = (event) => {
                if (event.keyCode === 13) {
                    this._doneEdit();
                }
                else if (event.keyCode === 27) {
                    this._cancelEdit();
                }
            };
            this._removeTodo = () => {
                this.props.onRemove(this.props.todo);
            };
            this._editTodo = () => {
                if (!this.context.can('update', this.props.todo)) {
                    return;
                }
                this.setState({ isEditing: true });
                this.refs.editInput.focus();
            };
            this._updateTitle = (event) => {
                this.setState({ editingTitle: event.target.value });
            };
            this._completeTodo = (event) => {
                this.props.onComplete(this.props.todo, event.target.checked);
            };
        }
        _cancelEdit() {
            this.setState({ isEditing: false, editingTitle: '' });
        }
        _getClassName() {
            const css = ['todo'];
            if (this.props.todo.completed) {
                css.push('completed');
            }
            if (this.state.isEditing) {
                css.push('editing');
            }
            return css.join(' ');
        }
        render() {
            const { todo } = this.props;
            return (<li className={this._getClassName()}>
                <Can do="update" on={todo}>
                    <input type="checkbox" checked={todo.completed} onChange={this._completeTodo} className="toggle"/>
                </Can>

                <div className="view">
                    <label onDoubleClick={this._editTodo}>{todo.title}</label>
                </div>

                <Can do="update" on={todo}>
                    <input className="edit" type="text" ref="editInput" value={this.state.editingTitle || todo.title} onBlur={this._doneEdit} onKeyUp={this._doneOrCancelEdit} onChange={this._updateTitle}/>
                </Can>

                <div className="assignee">
                    {todo.assignee}
                </div>

                <Can do="delete" on={todo}>
                    <button className="destroy" onClick={this._removeTodo}></button>
                </Can>
            </li>);
        }
    }
    TodoItem.contextType = AbilityContext;
    return TodoItem;
})();
export default TodoItem;
