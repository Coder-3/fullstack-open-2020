import React from 'react';
import ReactDOM from 'react-dom';

const Total = ({ courseContent }) => {
  const sumOfExercises = courseContent.reduce((accumulator, currentValue) => ({exercises: accumulator.exercises + currentValue.exercises}))

  return(
    <p><strong>total of {sumOfExercises.exercises} exercises</strong></p>
  ) 
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>   
  )
}

const Content = ({ courseContent }) => {
  return (
    <>
      {courseContent.map(part => 
        <Part key={part.id} part={part} />  
      )}
    </>
  )
}

const Header = ({ courseName }) => {
  return (
    <h1>{courseName}</h1>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header courseName={course.name} />
      <Content courseContent={course.parts} />
      <Total courseContent={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))