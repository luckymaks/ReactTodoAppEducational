import React from 'react';
import T from 'prop-types';
import s from './Filters.module.css';
import TodoList from '../TodoList/TodoList'
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom";

class Filters extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Router>
                <div className={s.container} onClick={this.props.onChange}>
                    <ul className={s.nav}>
                        <li className={s.item}>
                            <NavLink to='/showAll' className={s.link} activeClassName={s.active} >
                                Show All
                            </NavLink>
                        </li>
                        <li className={s.item}>
                            <NavLink to='/completed' className={s.link} activeClassName={s.active} >
                                Completed
                            </NavLink>
                        </li>
                        <li className={s.item}>
                            <NavLink to='/noCompleted' className={s.link} activeClassName={s.active} >
                                No completed
                            </NavLink>                    
                        </li>
                    </ul>
                </div>
                <div className={s.content}>
                    <Switch>
                        <Route path='/completed'>
                            <TodoList
                                items={JSON.parse(localStorage.getItem('Completed'))}
                                onTodoClick={this.props.onAddTodoClick}
                                onTodoRemoveClick={this.props.onRemoveClick}
                            />
                        </Route>
                        <Route path='/noCompleted'>
                            <TodoList
                                items={JSON.parse(localStorage.getItem('NoCompleted'))}
                                onTodoClick={this.props.onAddTodoClick}
                                onTodoRemoveClick={this.props.onRemoveClick}
                            />
                        </Route>
                        <Route path='/showAll'>
                        <TodoList
                            items={this.props.itemsTodo}
                            onTodoClick={this.props.onAddTodoClick}
                            onTodoRemoveClick={this.props.onRemoveClick}
                        />
                        </Route>
                        <Redirect from='/home' to='/showAll' />
                    </Switch>                
                </div>
            </Router>
    
        );
    }
}

Filters.propTypes = {
    onChange: T.func,
}

export default Filters;