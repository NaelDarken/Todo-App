
// Import modules
import {

    todoList,

    filter

} from './app-data'

// Import modules
import {

    saveData,

    renderData

} from './functions'

// Import libraries
import uuid4 from 'uuid/v4'

// rendering data
renderData(todoList, filter)

// Search input
const searchInput = document.querySelector('#search-text')
searchInput.addEventListener('input', event => {

    filter.searchInput = event.target.value
    renderData(todoList, filter)

})

// Add a new todo
const addTodo = document.querySelector('#addTodo')
addTodo.addEventListener('submit', event => {

    event.preventDefault()
    const title = event.target.elements.text.value.trim()

    // Add todo
    if (title.length > 0) {

        todoList.push({

            id: uuid4(),
            title,
            isCompleted: false
    
        })

         // Save data into local storage
        saveData("todoData", todoList)
        // Render data
        event.target.elements.text.value = ""
        renderData(todoList, filter)

    }

})

// Hide completed
const checkCompleted = document.querySelector('#hideCompleted')
checkCompleted.addEventListener('change', event => {

    filter.hideCompleted = event.target.checked
    renderData(todoList, filter)

})
