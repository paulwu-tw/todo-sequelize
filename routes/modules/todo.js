const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

// new todo
router.get('/new', (req, res) => {
    res.render('new')
})

router.post('/', (req, res) => {
    const name = req.body.name
    const userId = req.user.id

    Todo.create({ name, userId })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    return Todo.findByPk(id)
        .then((todo) => res.render('detail', { todo: todo.toJSON() }))
        .catch((err) => console.log(err));
})

// edit todo
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    Todo.findByPk(id)
        .then(todo => res.render('edit', { todo: todo.toJSON() }))
        .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const { name, isDone } = req.body
    Todo.update({
        name: name,
        isDone: isDone === 'on'
    }, {
        where: {
            id: id
        }
    })
        .then(() => res.redirect(`/todos/${id}`))
        .catch(err => console.log(err))
})

// delete todo
router.delete('/:id', (req, res) => {
    const id = req.params.id

    Todo.destroy({ where: { id: id } })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

module.exports = router