import * as React from 'react'
import styled from 'styled-components'

const Header = styled.section`
  width: 100%;
  height: 105px;
  box-shadow: 0px 0px 10px gray;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const ProjectsContainer = styled.nav`
  > a {
    padding: 0px 10px;
  }
`

type ProjectTabProps = {
  disabled: boolean;
}

const ProjectTab = styled.a`
  font-size: 16px;
  cursor: pointer;
  ${(props: ProjectTabProps) => props.disabled && "color: gray; cursor: not-allowed;"}
`

const ActiveProjectTab = styled(ProjectTab)`
  text-decoration: underline;
  text-decoration-color: #11a9f5;
  text-decoration-style: solid;
`

export default () => (
  <Header>
    <h2>Quality Todo List In Typescript</h2>
    <ProjectsContainer>
      <ActiveProjectTab disabled={false}>Project 1</ActiveProjectTab>
      <ProjectTab disabled>Project 2</ProjectTab>
      <ProjectTab disabled>Project 2</ProjectTab>
    </ProjectsContainer>
  </Header>
)
