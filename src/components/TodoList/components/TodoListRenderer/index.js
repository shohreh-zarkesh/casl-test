import React from 'react';
import TodoItem from './components/TodoItem';
export default function TodoListRenderer(props) {
    const { items, ...todoProps } = props;
    if (!items.length) {
        return null;
    }
    return (<section className="main">
        <ul className="todo-list">
            {items.map(todo => <TodoItem {...todoProps} todo={todo} key={todo.id}/>)}
        </ul>
    </section>);
}
