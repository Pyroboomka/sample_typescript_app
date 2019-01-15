import * as React from 'react'
import { Todo as TodoModel } from '../../models/Todo'
import styled from 'styled-components'

type TodoProps = TodoModel & {
  toggleTodo: (id: number) => void
}

// This shit is ugly and breaks my code highlight lul.
const Container = styled("div")<{ isDone: boolean }>`
  width: 400px;
  height: 100px;
  border: 1px solid gray;
  border-radius: 3px;
  display: flex;
  margin-top: 16px;
  padding: 6px;
  background-color: ${props => props.isDone ? '#90ee90' : 'inherit'};
`

const DateContainer = styled.small`
  display: flex;
  justify-content: flex-end;
  color: green;
`
const CheckboxWrapper = styled.div`
  width: 50px;
  display: flex;
  align-self: center;
  padding-right: 2px;
`
const Checkbox = styled.input`
  width: 38px;
  height: 38px;
  color: green;
`
const TodoDatum = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const formatTime = (dateObject: Date, type: string) => {
  let number = type === 'hr' ? dateObject.getHours() : dateObject.getMinutes()
  return String(number).length === 1 ? `0${number}` : number
}

export const Todo: React.FunctionComponent<TodoProps> = ({ id, text, isDone, dateCreated = '', toggleTodo }) => {
  const dateObject = new Date(dateCreated)
  return (
    <Container isDone={isDone}>
      <CheckboxWrapper>
        <Checkbox type="checkbox" checked={isDone} onChange={() => toggleTodo(id)}></Checkbox>
      </CheckboxWrapper>
      <TodoDatum>
      <DateContainer>
          {`${dateObject.toLocaleDateString()} at ${formatTime(dateObject, 'hr')}:${formatTime(dateObject, 'min')}`}
        </DateContainer>
        <p>{text}</p>
      </TodoDatum>
    </Container>
  )
}
