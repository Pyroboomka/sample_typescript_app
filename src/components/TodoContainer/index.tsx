import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Todo as TodoItem } from '../Todo'
import { toggleTodo, getTodoList, getActiveFilter, getFetchStatus, State } from '../../ducks/todos'
import { Todo } from '../../models/Todo'

interface TodoContainerProps {
  todoList: Todo[]
  activeFilter: string | null
  isFetching: boolean
  toggleTodo: (id: number) => void
}

class TodoContainer extends Component<TodoContainerProps> {
  private handleToggle = (id: number) => {
    this.props.toggleTodo(id)
  }

  public render() {
    const { todoList } = this.props
    return (
      <div className="todosContainer">
        {todoList.map((todo: Todo, index) => (
          <TodoItem key={index} toggleTodo={this.handleToggle} {...todo} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    todoList: getTodoList(state),
    activeFilter: getActiveFilter(state),
    isFetching: getFetchStatus(state),
  }
}

export default connect(
  mapStateToProps,
  { toggleTodo }
)(TodoContainer)
