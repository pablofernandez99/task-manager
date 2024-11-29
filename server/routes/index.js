const express = require("express")

const router = express.Router()

let tasks = []
let idx = 0

router.get("/", (req, res) => {
    res.json({
        tasks
    })
})

router.post("/", (req, res) => {
    const { title, description } = req.body

    const task = {
        id: idx,
        title,
        description
    }

    tasks.push(task)
    idx++

    res.json({
        tasks
    })
})

router.put("/", (req, res) => {
    const { id, title, description } = req.body
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id))

    if (taskIndex != -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], title, description }

        res.json(tasks[taskIndex])

        return
    }

    console.log(tasks)

    res.json({
        tasks
    })

})

router.delete("/", (req, res) => {
    const { id } = req.body

    tasks = tasks.filter((task) => task.id !== parseInt(id))

    res.json({
        tasks
    })

})

module.exports = router