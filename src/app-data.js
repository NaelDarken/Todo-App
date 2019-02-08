
// Read and get data for the local storage
const getData = dataName => {

    const todoJSON = window.localStorage.getItem(dataName)

    if (todoJSON !== null) {

        return JSON.parse(todoJSON)

    } else {

        return []

    }

}

// ToDo data list
let todoList = getData('todoData')

// Filtering data
const filter = {

    searchInput: "",
    hideCompleted: false

}

// Export modules
export {

    todoList,

    filter

}
