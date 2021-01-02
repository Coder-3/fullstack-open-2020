import React from 'react'

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

export default Course