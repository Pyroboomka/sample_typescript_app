import { Todo } from '../models/Todo'
import { Map } from '../models/common'
import { put, takeLatest, ForkEffect } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { createSelector } from 'reselect'

const createActionTypes = (action: string) => {
  return ['REQUEST', 'SUCCESS', 'FAILURE'].reduce(
    (acc, item) => ({
      ...acc,
      [item]: `${action}_${item}`,
    }),
    {} as { [key: string]: string }
  )
}

// ActionTypes
// Flux Standard Action
type FSAction = {
  type: string
  payload?: any
  meta?: any
  error?: boolean
}

const CREATE_TODO = createActionTypes('CREATE_TODO')
const TOGGLE_TODO = createActionTypes('TOGGLE_TODO')

// Reducer
export type State = {
  readonly todos: Map<Todo>
  readonly activeFilter: string | null
  readonly isFetching: boolean
}

const initialState: State = {
  activeFilter: null,
  isFetching: false,
  todos: {},
}

export default function reducer(state: State = initialState, { type, payload }: FSAction) {
  switch (type) {
    case TOGGLE_TODO.REQUEST:
    case CREATE_TODO.REQUEST: {
      return { ...state, isFetching: true }
    }

    case TOGGLE_TODO.SUCCESS: {
      const todoToToggle = state.todos[payload]
      return {
        ...state,
        todos: {
          ...state.todos,
          [payload]: { ...todoToToggle, isDone: !todoToToggle.isDone },
        },
      }
    }
    case CREATE_TODO.SUCCESS: {
      return {
        ...state,
        todos: {
          ...state.todos,
          [payload.id]: payload,
        },
      }
    }
    default:
      return state
  }
}

// Selectors

export const getTodoList = createSelector(
  (state: State) => state.todos,
  (todos: Map<Todo>) => {
    return Object.keys(todos).map(id => todos[id])
  }
)

export const getActiveFilter = (state: State) => state.activeFilter
export const getFetchStatus = (state: State) => state.isFetching

// Actions
export const createTodo = (todo: Partial<Todo>) :FSAction => {
  return {
    type: CREATE_TODO.REQUEST,
    payload: todo,
  }
}

export const toggleTodo = (id: number) :FSAction => {
  return {
    type: TOGGLE_TODO.REQUEST,
    payload: id,
  }
}

// Sagas

// UUID counter for adding todos.
let uuid = 0
export function* createTodoSaga({ payload }: FSAction) {
  // yield delay(1000)
  uuid++
  const newTodo = {
    ...payload,
    id: uuid,
    dateCreated: Date.now(),
    isDone: false,
  }
  yield put({
    type: CREATE_TODO.SUCCESS,
    payload: newTodo,
  })
}

export function* toggleTodoSaga({ payload }: FSAction) {
  yield delay(300)
  yield put({
    type: TOGGLE_TODO.SUCCESS,
    payload,
  })
}

export const sagas: ForkEffect[] = [
  takeLatest(CREATE_TODO.REQUEST, createTodoSaga),
  takeLatest(TOGGLE_TODO.REQUEST, toggleTodoSaga),
]
