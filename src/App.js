import React from 'react';
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
      todos: JSON.parse(localStorage.getItem('ShowAll')),
      todoListShow: false,
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
    for(let keys in this.state.todos){
      for(let i = 0; i < this.state.todos[keys].length; i++) {
        list.push(this.state.todos[keys][i]);
      }
    }

    this.setState({
      todos: this.state.todos || this.state.todos.concat(list),
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
    const arr = [todo].concat(this.state.todos);
    localStorage.setItem('ShowAll', JSON.stringify(arr));
    
    this.setState({
      inputValue: '',
      todos: [todo].concat(this.state.todos),
    });
    
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
      })
    } else if(value === 'completed') {
      const todoListCompleted = showAll.filter(i => i.completed === true);
      localStorage.setItem('Completed', JSON.stringify(todoListCompleted));
      this.setState({
        todos: JSON.parse(localStorage.getItem('Completed')),
        todoListShow: false,
        todoListCompleted: true,
        todoListNoCompleted: false,
      })
    } else if(value === 'noCompleted'){
      const todoListNoCompleted = showAll.filter(i => i.completed === false);
      localStorage.setItem('NoCompleted', JSON.stringify(todoListNoCompleted));
      this.setState({
        todos: JSON.parse(localStorage.getItem('NoCompleted')),
        todoListShow: false,
        todoListCompleted: false,
        todoListNoCompleted: true,
      })
    }
  }

  render() {
    return (
      <div className={s.App}>
        <div className={s.container}>
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