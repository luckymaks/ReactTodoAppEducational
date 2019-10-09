import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect } from "react-router-dom";
import s from './App.module.css';
import Header from './components/Header/Header';
import Filters from './components/Filters/Filters';
import {createTodo} from './utils/creators';

class App extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      todos: [],
    };
    this._inputRef = React.createRef();
    this.onChangeInputText = this.onChangeInputText.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleTodoClick = this.handleTodoClick.bind(this);
    this.handleTodoRemoveClick = this.handleTodoRemoveClick.bind(this);
    this.getCompletedCount = this.getCompletedCount.bind(this);
    this.onChangeCompleted = this.onChangeCompleted.bind(this);
  }
  componentDidMount() {
    let list = [];
    const arrKeys = JSON.parse(localStorage.getItem('ShowAll'));
    for(let keys in arrKeys){
      for(let i = 0; i < arrKeys[keys].length; i++) {
        list.push(arrKeys[keys][i]);
      }
    }

    this.setState({
      todos: arrKeys || this.state.todos.concat(list),
    });
  }

  onChangeInputText(inputValue) {
    this.setState({
      inputValue,
    });
  };

  handleAddTodo() {
    const { inputValue } = this.state;
    const pathName = window.location.pathname;
    

    if(inputValue.trim().length === 0) {
      return;
    }

    const todo = createTodo(this.state.inputValue);
    let arr = [];

    if(pathName === '/showAll') {
      arr = [todo].concat(JSON.parse(localStorage.getItem('ShowAll')) || this.state.todos);
      localStorage.setItem('ShowAll', JSON.stringify(arr));
      this.setState({
        inputValue: '',
        todos: JSON.parse(localStorage.getItem('ShowAll')),
      });
    } else if(pathName === '/completed') {
      arr = [todo].concat(JSON.parse(localStorage.getItem('ShowAll')));
      localStorage.setItem('ShowAll', JSON.stringify(arr))
      this.setState({
        inputValue: '',
        todos: JSON.parse(localStorage.getItem('Completed')),
      });
    } else if(pathName === '/noCompleted') {
      const arrShow = [todo].concat(JSON.parse(localStorage.getItem('ShowAll')));
      arr = [todo].concat(JSON.parse(localStorage.getItem('NoCompleted')));
      localStorage.setItem('NoCompleted', JSON.stringify(arr));
      localStorage.setItem('ShowAll', JSON.stringify(arrShow));
      this.setState({
        inputValue: '',
        todos: JSON.parse(localStorage.getItem('NoCompleted')),
      });
    }

    this._inputRef.current.focus();
  }

  handleTodoClick(id) {
    const currentTodoIndex = this.state.todos.findIndex(i => i.id === id);

    if (currentTodoIndex === -1) {
      return;
    }

    const todo = { ...this.state.todos[currentTodoIndex] };
    todo.completed = !todo.completed;
    const newTodos = [...this.state.todos];
    newTodos[currentTodoIndex] = todo;
    localStorage.setItem('ShowAll', JSON.stringify(newTodos));
    
    this.setState({
      todos: newTodos,
    });
  }

  handleTodoRemoveClick(id) {
    const pathName = window.location.pathname;
    let ListTodo = JSON.parse(localStorage.getItem('ShowAll'));
    let todoListCompleted = [];
    
    if(pathName === '/showAll') {
      todoListCompleted = ListTodo.filter(i => i.id !== id);
      localStorage.setItem('ShowAll', JSON.stringify(todoListCompleted));
      this.setState({
        todos: JSON.parse(localStorage.getItem('ShowAll')),
      });
    } else if(pathName === '/completed') {
      const todoList = JSON.parse(localStorage.getItem('ShowAll')).filter(i => i.id !== id);
      localStorage.setItem('ShowAll', JSON.stringify(todoList));
      ListTodo = JSON.parse(localStorage.getItem('Completed'));
      todoListCompleted = ListTodo.filter(i => i.id !== id);
      localStorage.setItem('Completed', JSON.stringify(todoListCompleted));
      this.setState({
        todos: JSON.parse(localStorage.getItem('Completed')),
      });
    } else if(pathName === '/noCompleted') {
      const todoList = JSON.parse(localStorage.getItem('ShowAll')).filter(i => i.id !== id);
      localStorage.setItem('ShowAll', JSON.stringify(todoList));
      ListTodo = JSON.parse(localStorage.getItem('NoCompleted'));
      todoListCompleted = ListTodo.filter(i => i.id !== id);
      localStorage.setItem('NoCompleted', JSON.stringify(todoListCompleted));
      this.setState({
        todos: JSON.parse(localStorage.getItem('NoCompleted')),
      });
    }
  }

  getCompletedCount() {
    return this.state.todos
      .filter(i => i.completed)
      .length;
  }
  
  onChangeCompleted(e) {
    const pathName = window.location.pathname;
    const value = e.target.value;
    const showAll = JSON.parse(localStorage.getItem('ShowAll'));
    
    if(pathName === '/showAll'){
      this.setState({
        todos: showAll,
      });
    } else if(pathName === '/completed') {
      const todoListCompleted = showAll.filter(i => i.completed === true);
      localStorage.setItem('Completed', JSON.stringify(todoListCompleted));
      this.setState({
        todos: JSON.parse(localStorage.getItem('Completed')),
      });
    } else if(pathName === '/noCompleted'){
      const todoListNoCompleted = showAll.filter(i => i.completed === false);
      localStorage.setItem('NoCompleted', JSON.stringify(todoListNoCompleted));
      this.setState({
        todos: JSON.parse(localStorage.getItem('NoCompleted')),
      });
    }
  }

  render() {
    return (
      <div className={s.App}>
        <div className={s.container}>
          <Router>
            <ul className={s.nav}>
              <li>
                <NavLink to="/home" className={s.link} activeClassName={s.active} >Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" className={s.link} activeClassName={s.active} >About</NavLink>
              </li>
              <li>
                <NavLink to="/help" className={s.link} activeClassName={s.active} >Help</NavLink>
              </li>
            </ul>
            <Switch>
              <Route path='/about'>
                <div className={s.about}>The application was created in order to understand what React.</div>
              </Route>
              <Route path='/help'>
                <div className={s.help}>For all questions  write to the mail: maksimenko.maksim.2310@gmail.com</div>
              </Route>
              <Route path='/home'>
                <Header
                  inputRef={this._inputRef}
                  value={this.state.inputValue}
                  onChangeText={this.onChangeInputText}
                  onClick={this.handleAddTodo}
                />
                <Filters
                  onChange={this.onChangeCompleted}
                  itemsTodo={this.state.todos}
                  onAddTodoClick={this.handleTodoClick}
                  onRemoveClick={this.handleTodoRemoveClick}
                />
              </Route>
              <Redirect from='/' to='/home' />
            </Switch>
          </Router>
          <footer className={s.footer}>
            <div>
              Completed: {this.getCompletedCount()}
            </div>
            <div>
              Total: {this.state.todos.length}
            </div>
            </footer>
        </div>
      </div>
    );
  }
}

export default App;