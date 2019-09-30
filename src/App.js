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
      todos: this.state.todos.concat(list),
    })
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
    localStorage.setItem('ShowAll', JSON.stringify({ShowAll: arr}));
    
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
    const delTodo = this.state.todos.filter(i => i.id !== id);
    localStorage.setItem('ShowAll', JSON.stringify(delTodo));
    
    this.setState({
      todos: delTodo,
    })
  }

  getCompletedCount() {
    return this.state.todos
      .filter(i => i.completed)
      .length;
  }
  
  onChangeCompleted(e) {
    const value = e.target.value;
    if(value === 'shoAll'){
      console.log(e.target);
      this.setState({
        todos: this.state.todos
      })
    } else if(value === 'completed') {
      this.setState({
        todos: this.state.todos.filter(i => i.completed === true),
      })
    } else if(value === 'noCompleted'){
      this.setState({
        todos: this.state.todos.filter(i => i.completed !== true),
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