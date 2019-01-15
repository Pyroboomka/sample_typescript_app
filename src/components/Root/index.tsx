import * as React from 'react'
import { Component } from 'react'
import TodoForm from '../TodoForm'
import Header from '../Header'
import TodoContainer from '../TodoContainer'
import styled from 'styled-components'

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`

const TodosContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  padding-top: 1em;
  margin-top: 6px;
  background: #f5f7f7;
`

export default () => (
  <AppContainer>
    <Header />
    <TodosContainer>
      <TodoForm />
      <TodoContainer />
    </TodosContainer>
  </AppContainer>
)
