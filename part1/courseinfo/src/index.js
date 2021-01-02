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
    <h2>{courseName}</h2>
  )
}

const Course = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
        <>
          <Header key={course.id} courseName={course.name} />
          <Content key={course.id} courseContent={course.parts} />
          <Total key={course.id} courseContent={course.parts} />
        </>
      )}
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

ReactDOM.render(<App />, document.getElementById('root'))