import './_TodoList.scss';

import Immutable from 'immutable';
import React from 'react';

import Todo from '../../components/Todo/Todo';

import ImmutablePropTypes from 'react-immutable-proptypes';

class TodoList extends React.Component {

  shouldComponentUpdate (nextProps) {
    return !Immutable.is(this.props.todoItems, nextProps.todoItems);
  }

  render () {
    return (
      <div className="TodoList">
        {this.props.todoItems.map(this._renderTodo, this)}
      </div>
    )
  }

  _renderTodo (todoObj) {
    return (
      <Todo key={todoObj.get('id')} todoObj={todoObj} />
    );
  }
}

TodoList.propTypes = {
  todoItems: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      id: React.PropTypes.number.isRequired,
      description: React.PropTypes.string.isRequired
    })
  ).isRequired
};

export default TodoList;
