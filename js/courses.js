
const coursesForm = document.getElementById("courses-form");
const coursesInput1 = document.getElementById("course1");
const coursesInput2 = document.getElementById("course2");
const coursesInput3 = document.getElementById("course3");
const coursesInput4 = document.getElementById("course4");
const coursesList = document.getElementById("courses-list");
const clearCourseButton = document.getElementById("clear-button");

const COURSES_KEY = "courses";
const TODOS_KEY = "todos";

let todoInputList = [];

let toDos = [];

const savedToDos = localStorage.getItem(TODOS_KEY);



function handleCoursesSubmit(event) {
    event.preventDefault();
    const newCourses = [coursesInput1.value, coursesInput2.value, coursesInput3.value, coursesInput4.value];
    localStorage.setItem(COURSES_KEY, JSON.stringify(newCourses));
    paintCourses(newCourses);
    window.location.reload();
}

function saveTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function createToDo(col, i) {

    // create todo html
    let toDoForm = document.createElement("form");
    let toDoInput = document.createElement("input");
    let toDoList = document.createElement("ul");

    toDoForm.setAttribute("id", `todo-form ${i + 1}`);

    toDoInput.setAttribute("type", "text");
    toDoInput.setAttribute("placeholder", "Write a To Do and Press Enter");


    toDoList.setAttribute("id", "todo-list");

    col.appendChild(toDoForm);
    toDoForm.appendChild(toDoInput);
    col.appendChild(toDoList);

    todoInputList.push(toDoInput);

    // add todo event listener
    toDoForm.addEventListener("submit", handleToDoSubmit);

}


function paintToDo(newTodo, event) {
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.innerText = newTodo;
    const button = document.createElement("button");
    button.innerText = "x";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    let toDoList = event.target.nextSibling;
    toDoList.appendChild(li);
}

function paintSavedToDo(newTodo, toDoNum) {
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.innerText = newTodo;
    const button = document.createElement("button");
    button.innerText = "x";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    let toDoList = document.getElementById(`todo-form ${toDoNum}`).nextSibling;
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    // add how to access the input
    let toDoInput = event.target[0];
    let newTodo = toDoInput.value;
    toDoInput.value = "";
    toDos.push(newTodo, event.target.getAttribute("id")[10]);
    paintToDo(newTodo, event);
    saveTodos();
}


function deleteToDo(event) {
    const li = event.target.parentElement;
    for (let i = 0; i < toDos.length; i = i + 2) {
        if (toDos[i] == li.firstChild.innerText) {
            toDos = toDos.slice(0, i).concat(toDos.slice(i + 2, toDos.length))
            console.log(toDos);
            break;
        }
    }
    saveTodos();
    li.remove();
}



function paintCourses() {
    const container = document.createElement("div");
    container.classList.add("container");
    coursesList.appendChild(container);

    const row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);

    for (let i = 0; i < 4; i++) {
        // create column for courses
        const col = document.createElement("div");
        col.innerText = JSON.parse(localStorage[COURSES_KEY])[i];
        col.classList.add("col");
        col.classList.add("centerText")
        row.appendChild(col);

        // add to do list for courses
        createToDo(col, i);
    }
    clearCourseButton.classList.toggle("hidden")


}


function handleClearCourses() {
    localStorage.removeItem("courses");
    window.location.reload();

}


clearCourseButton.addEventListener("click", handleClearCourses);


const savedCourses = localStorage.getItem(COURSES_KEY);

if (savedCourses == null) {
    coursesForm.classList.remove(HIDDEN);
    coursesForm.addEventListener("submit", handleCoursesSubmit);
} else {
    paintCourses(savedCourses);
}


if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);

    for (let i = 0; i < parsedToDos.length; i++) {
        toDos.push(parsedToDos[i]);
    }

    for (let i = 0; i < parsedToDos.length; i += 2) {
        paintSavedToDo(parsedToDos[i], parseInt(parsedToDos[i + 1]));
    }

}