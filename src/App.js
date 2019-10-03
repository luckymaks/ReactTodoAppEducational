import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import s from './App.module.css';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import Filters from './components/Filters/Filters';
import {createTodo} from './utils/creators';

class App extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      todos: [],
      todoListShow: true,
      todoListCompleted: false,
      todoListNoCompleted: false,
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

    if(inputValue.trim().length === 0) {
      return;
    }

    const todo = createTodo(this.state.inputValue);
    let arr = [];

    if(this.state.todoListShow) {
      arr = [todo].concat(JSON.parse(localStorage.getItem('ShowAll')));
      localStorage.setItem('ShowAll', JSON.stringify(arr));
      this.setState({
        inputValue: '',
        todos: JSON.parse(localStorage.getItem('ShowAll')),
      });
    } else if(this.state.todoListCompleted) {
      arr = [todo].concat(JSON.parse(localStorage.getItem('ShowAll')));
      localStorage.setItem('ShowAll', JSON.stringify(arr))
      this.setState({
        inputValue: '',
        todos: JSON.parse(localStorage.getItem('Completed')),
      });
    } else if(this.state.todoListNoCompleted) {
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
    let ListTodo = JSON.parse(localStorage.getItem('ShowAll'));
    let todoListCompleted = [];
    
    if(this.state.todoListShow) {
      todoListCompleted = ListTodo.filter(i => i.id !== id);
      console.log(todoListCompleted)
      localStorage.setItem('ShowAll', JSON.stringify(todoListCompleted));
      this.setState({
        todos: JSON.parse(localStorage.getItem('ShowAll')),
      });
    } else if(this.state.todoListCompleted) {
      const todoList = JSON.parse(localStorage.getItem('ShowAll')).filter(i => i.id !== id);
      localStorage.setItem('ShowAll', JSON.stringify(todoList));
      ListTodo = JSON.parse(localStorage.getItem('Completed'));
      todoListCompleted = ListTodo.filter(i => i.id !== id);
      localStorage.setItem('Completed', JSON.stringify(todoListCompleted));
      this.setState({
        todos: JSON.parse(localStorage.getItem('Completed')),
      });
    } else if(this.state.todoListNoCompleted) {
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
    const value = e.target.value;
    const showAll = JSON.parse(localStorage.getItem('ShowAll'));
    
    if(value === 'showAll'){
      this.setState({
        todos: showAll,
        todoListShow: true,
        todoListCompleted: false,
        todoListNoCompleted: false,
      });
    } else if(value === 'completed') {
      const todoListCompleted = showAll.filter(i => i.completed === true);
      localStorage.setItem('Completed', JSON.stringify(todoListCompleted));
      this.setState({
        todos: JSON.parse(localStorage.getItem('Completed')),
        todoListShow: false,
        todoListCompleted: true,
        todoListNoCompleted: false,
      });
    } else if(value === 'noCompleted'){
      const todoListNoCompleted = showAll.filter(i => i.completed === false);
      localStorage.setItem('NoCompleted', JSON.stringify(todoListNoCompleted));
      this.setState({
        todos: JSON.parse(localStorage.getItem('NoCompleted')),
        todoListShow: false,
        todoListCompleted: false,
        todoListNoCompleted: true,
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
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/help">Help</Link>
              </li>
            </ul>
            <Switch>
              <Route path='/about'>
                <div className={s.about}>The application was created in order to understand what React.</div>
              </Route>
              <Route path='/help'>
                <div className={s.help}>For all questions  write to the mail: maksimenko.maksim.2310@gmail.com</div>
              </Route>
              <Route path='/'>
                <Header
                  inputRef={this._inputRef}
                  value={this.state.inputValue}
                  onChangeText={this.onChangeInputText}
                  onClick={this.handleAddTodo}
                />
                <Filters
                  onChange={this.onChangeCompleted}
                />
                <TodoList
                  items={this.state.todos}
                  onTodoClick={this.handleTodoClick}
                  onTodoRemoveClick={this.handleTodoRemoveClick}
                />
              </Route>
            </Switch>
          </Router>
          <footer>
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