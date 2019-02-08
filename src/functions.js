
// Import modules
import {

    todoList,

    filter

} from './app-data'

// Save data into local storage
const saveData = (dataName, arr) => {

    window.localStorage.setItem(dataName, JSON.stringify(arr))

}

// Deleted Selected todo
const deleteSelectedElem = id => {

    const todoIndex = todoList.findIndex(todo => todo.id === id)

    todoIndex > -1 ? todoList.splice(todoIndex, 1) : false

}

// Check is that todo completed or not
const toggleTodo = id => {

    const todoElem = todoList.find(item => item.id === id)

    todoElem !== undefined ? todoElem.isCompleted = !todoElem.isCompleted : false

}

// Create todo dom element
const createTodoElem = item => {

    const content = document.createElement('label')
    content.classList.add('list-item')
    const todoContainer = document.createElement('div')
    content.appendChild(todoContainer)
    todoContainer.classList.add('list-item__container')
    const todoTitle = document.createElement('span')

    // Checkbox
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = item.isCompleted
    todoContainer.appendChild(checkbox)

    // Check completed todo
    checkbox.addEventListener("change", () => {
        
        toggleTodo(item.id)
        saveData("todoData", todoList)
        renderData(todoList, filter)

    })

    // Delete button
    const deleteTodo = document.createElement('button')
    deleteTodo.textContent = "Remove"
    deleteTodo.classList.add('button', 'button--text')

    // Delete todo
    deleteTodo.addEventListener("click", () => {

        deleteSelectedElem(item.id)
        saveData("todoData", todoList)
        renderData(todoList, filter)

    })

    // Check existing data
    item.title.length > 0 ? todoTitle.textContent = item.title : todoTitle.textContent = "Untitled"

    todoContainer.appendChild(todoTitle)
    content.appendChild(deleteTodo)

    return content

}

// Create todo incomplete dom element
const createIncElem = arr => {

    const incomplete = document.createElement('h2')
    incomplete.classList.add('list-title')
    const numbers = arr.length === 1 ? "" : "s"
    incomplete.textContent = `You have ${arr.length} incompleted todo${numbers}`

    return incomplete

}

// Rendering application data
const renderData = (lists, input) => {

    // Searched data
    const data = lists.filter(item => {

        const searchMatch = item.title.toLowerCase().includes(input.searchInput.toLowerCase())
        const hideCompletedMatch = !input.hideCompleted || !item.isCompleted

        return searchMatch && hideCompletedMatch

    })

    // Incompleted todo
    const incompleted = lists.filter(todo => !todo.isCompleted)

    // Data container
    const container = document.querySelector('#todos')
    container.innerHTML = ""

    // Incompleted todo shown
    const incElem = createIncElem(incompleted)
    // Append element
    container.appendChild(incElem)

    // Data shown
    if (data.length > 0) {

        data.forEach(todo => {

            // Create dom element for our todo
            const todoElem = createTodoElem(todo)
            // Append our element
            container.appendChild(todoElem)
    
        })

    } else {

        const message = document.createElement('p')
        message.classList.add('empty-message')
        message.textContent = "No Tods founded!"
        container.appendChild(message)

    }

}

// Export modules
export {

    saveData,

    renderData

}
