import './_Todo.scss';

import Immutable from 'immutable';
import React from 'react';

import ImmutablePropTypes from 'react-immutable-proptypes';

class Todo extends React.Component {

  constructor (...args) {
    super(...args);
  }

  shouldComponentUpdate (nextProps) {
    return !Immutable.is(this.props.todoObj, nextProps.todoObj);
  }

  render () {
    return (
      <div className="Todo">
        {this.props.todoObj.get('description')}
      </div>
    )
  }

}

Todo.propTypes = {
  todoObj: ImmutablePropTypes.contains({
    id: React.PropTypes.number.isRequired,
    description: React.PropTypes.string.isRequired
  }).isRequired
};

export default Todo;
