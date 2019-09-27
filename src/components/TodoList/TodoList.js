import React from 'react';
import T from 'prop-types';
import s from './TodoList.module.css';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({
    items,
    onTodoClick,
    onTodoRemoveClick
}) => (
    <ul style={{listStyleType: 'none', margin: 0, padding: 0}}>
        {items.map(i => (
            <TodoItem 
                onRemoveClick={onTodoRemoveClick}
                onClick={onTodoClick}
                key={i.id}
                {...i}
            />
        ))}
    </ul>
);

TodoList.propTypes = {
    value: T.string,
    onClick: T.func,
    onChangeText: T.func,
}

export default TodoList;