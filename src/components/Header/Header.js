import React from 'react';
import T from 'prop-types';
import s from './Header.module.css';

const TodoList = ({
    value,
    onClick,
    onChangeText,
    inputRef
}) => (
    <div className={s.container}>
        <input
            value={value}
            ref={inputRef}
            onChange={event => onChangeText(event.target.value)}
        />
        <button onClick={onClick}>Add todo</button>
    </div>
);

TodoList.propTypes = {
    value: T.string,
    onClick: T.func,
    onChangeText: T.func,
}

export default TodoList;