
const coursesForm = document.getElementById("courses-form");
const coursesInput1 = document.getElementById("course1");
const coursesInput2 = document.getElementById("course2");
const coursesInput3 = document.getElementById("course3");
const coursesInput4 = document.getElementById("course4");
const coursesList = document.getElementById("courses-list");
const clearCourseButton = document.getElementById("clear-button");

const COURSES_KEY = "courses";


function handleCoursesSubmit(event) {
    event.preventDefault();
    const newCourses = [coursesInput1.value, coursesInput2.value, coursesInput3.value, coursesInput4.value];
    localStorage.setItem(COURSES_KEY, JSON.stringify(newCourses));
    paintCourses(newCourses);
    window.location.reload();
}


// function paintCourses() {
//     for (let i = 0; i < 4; i++) {
//         const li = document.createElement("li");
//         const span = document.createElement("span");
//         li.appendChild(span);
//         li.setAttribute("style", "display:inline");
//         span.innerText = JSON.parse(localStorage[COURSES_KEY])[i];
//         coursesList.appendChild(li);
//     }

// }

function paintCourses() {
    const container = document.createElement("div");
    container.classList.add("container");
    coursesList.appendChild(container);

    const row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);

    for (let i = 0; i < 4; i++) {
        const col = document.createElement("div");
        col.innerText = JSON.parse(localStorage[COURSES_KEY])[i];
        col.classList.add("col");
        col.classList.add("centerText")
        row.appendChild(col);

    }

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

