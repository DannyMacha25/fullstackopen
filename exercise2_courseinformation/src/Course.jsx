const Course = ({course}) => {
    console.log(course.parts.map(part => part.name))
    let exercises = course.parts.map(part => part.exercises)
  
    const sum = exercises.reduce((a,b) => a + b, 0)
    return (
      <div>
        <h1>{course.name}</h1>
        {
          course.parts.map(part => 
            <p>{part.name} {part.exercises}</p>
          )
        }
  
        <b>The total is {sum}</b>
  
  
      </div>
    )
  }
  
  const AllCourses = ({course_list}) => {
    return (
      <div>
        {course_list.map(course => <Course course={course}/>)}
      </div>
    )
  }

export default AllCourses