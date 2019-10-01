import React from 'react';
import T from 'prop-types';
import s from './Filters.module.css';

const Filters = ({
    onChange,
}) => (
    <div className={s.container} onChange={onChange}>
        <label className={s.item}>
            Show all
            <input type="radio" name="completed" value="showAll" defaultChecked='checked' />
        </label>
        <label className={s.item}>
            Completed
            <input type="radio" name="completed" value="completed" />
        </label>
        <label className={s.item}>
            No completed
            <input type="radio" name="completed" value="noCompleted" />
        </label>
    </div>
);

Filters.propTypes = {
    onChange: T.func,
}

export default Filters;