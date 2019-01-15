import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { createTodo } from '../../ducks/todos'
import { Todo } from '../../models/Todo'

const Input = styled.input`
  width: 280px;
  padding: 8px;
`

const FormContainer = styled.div`
  width: 400px
  form {
    display: flex;
    justify-content: space-around;
  }
  input[type="submit"] {
    width: 90px;
    border-radius: 6px;
    background: orange;
    color: white;
  }
`

type TodoFormState = {
  readonly todoText: string
  readonly error: boolean;
}

type TodoFormProps = {
  createTodo: (todo: Partial<Todo>) => void
}

class TodoForm extends React.Component<TodoFormProps, TodoFormState> {
  state: TodoFormState = {
    todoText: '',
    error: false,
  }

  private handleSubmit = (e: any) => {
    e.preventDefault()
    if (this.state.todoText.trim()) {
      this.props.createTodo({ text: this.state.todoText })
      this.setState({ todoText: ''})
    } else {
      // Tried submitting something wierd
      this.setState({
        error: true,
      })
    }

  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoText: e.target.value,
    })
  }

  public render() {
    return (
      <FormContainer>
        <form onSubmit={this.handleSubmit}>
          <Input placeholder="Enter text here" value={this.state.todoText} onChange={this.handleChange} />
          <input type="submit" value="Add"/>
        </form>
      </FormContainer>
    )
  }
}

export default connect(
  null,
  { createTodo }
)(TodoForm)
