import React from 'react';
import T from 'prop-types';
import s from './Filters.module.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function Filters({
    onChange,
    match
}) {
    return (
        <Router>
            <div className={s.container} onChange={onChange}>
                <ul className={s.nav}>
                    <Link to='/showAll'>
                        <li className={s.item}>Show All</li>
                    </Link>
                    <Link to='/completed'>
                        <li className={s.item}>Completed</li>
                    </Link>
                    <Link to='/noCompleted'>
                        <li className={s.item}>No completed</li>
                    </Link>                    
                </ul>
            </div>
            <div className={s.content}>
                <Switch>
                    <Route path='/showAll'>
                        <div>ShowAll</div>
                    </Route>
                    <Route path='/completed'>
                        <div>Completed</div>
                    </Route>
                    <Route path='/noCompleted'>
                        <div>No completed</div>
                    </Route>
                </Switch>                
            </div>
        </Router>
        
    );
}

Filters.propTypes = {
    onChange: T.func,
}

export default Filters;