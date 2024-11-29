import { useEffect, useState } from 'react'

import './App.css'

function App() {

  const [task, setTask] = useState({ title: "", description: "" })
  const [data, setData] = useState([])

  const [updateID, setUpdateID] = useState(null)

  const handleChangeValue = (e) => {
    const { name, value } = e.target

    setTask({ ...task, [name]: value })
  }

  const getTasks = async () => {
    const getTasks = await fetch("http://localhost:8080")
    const data = await getTasks.json()

    console.log(data)

    setData(data)
  }

  const handleCreateUpdateTask = async (e) => {
    e.preventDefault()

    if (Object.values(task).includes("")) {
      return
    }

    if (updateID !== undefined && updateID !== null) {
      await fetch("http://localhost:8080", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: updateID,
          title: task.title,
          description: task.description
        })
      })

      setUpdateID(null)

    } else {
      await fetch("http://localhost:8080", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description
        })
      })
    }

    setTask({ title: "", description: "" })
    getTasks()

  }

  const handleUpdate = (id, title, description) => {
    setTask({ title, description })
    setUpdateID(id)
  }

  const handleDeleteTask = async (id) => {
    await fetch("http://localhost:8080", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id
      })
    })

    getTasks()
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <>
      <header>
        <h1>Task Manager</h1>
      </header>

      <section className="task-form-section">
        <h2>{updateID ? "Update Task" : "Create Task"}</h2>
        <div className="task-form-container">
          <form onSubmit={handleCreateUpdateTask}>
            <input
              className="task-input"
              placeholder="Title"
              type="text"
              name="title"
              value={task.title}
              onChange={handleChangeValue}
            />
            <input
              className="task-input"
              placeholder="Description"
              type="text"
              name="description"
              value={task.description}
              onChange={handleChangeValue}
            />
            <button type="submit" className="submit-btn">
              {updateID !== null ? "Update" : "Create"}
            </button>
          </form>
        </div>
      </section>

      <section className="task-list-section">
        <h2>Tasks</h2>
        <ul className="task-list">
          {data.tasks && data.tasks.map(({ id, title, description }) => (
            <li key={id} className="task-item">
              <p>{title} - {description}</p>
              <div className="task-actions">
                <button className="update-btn" onClick={() => handleUpdate(id, title, description)}>Update</button>
                <button className="delete-btn" onClick={() => handleDeleteTask(id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default App
