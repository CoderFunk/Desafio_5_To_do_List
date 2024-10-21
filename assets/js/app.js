const tbody = document.querySelector("tbody");
const btn = document.querySelector("button");
const input = document.querySelector("input");


const tasks = [
    { id: 1, nameTask: "Revisar lista de llamados pendientes.", completed: false },
    { id: 2, nameTask: "Comprar materiales para el viernes.", completed: false },
    { id: 3, nameTask: "Reorganizar los eventos del mes.", completed: false }
];



function renderTasks(tasks) {
    tbody.innerHTML = "";
    tasks.forEach((task) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.id}</td>
            <td class="${task.completed ? 'completed' : ''}">${task.nameTask}</td>
            <td><input type="checkbox" ${task.completed ? 'checked' : ''}></td>
            <td><button class="delete-btn"><i class="fa-solid fa-x fa-xl" style="color: red;"></i></button></td>
        `;

        const checkbox = row.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            renderTasks(tasks);
            updateTaskCounters();
        });

        const deleteBtn = row.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            tasks.splice(tasks.indexOf(task), 1);
            renderTasks(tasks);
            updateTaskCounters();
        });
        tbody.appendChild(row);
    });
}



function updateTaskCounters() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    document.getElementById("total-tasks").innerHTML = `Total de tareas: <strong>${totalTasks}</strong>`;
    document.getElementById('comple-tasks').innerHTML = `Total realizadas: <strong>${completedTasks}</strong>`;
}

renderTasks(tasks);
updateTaskCounters();





btn.addEventListener("click", () => {
    const newTask = input.value;
    if (newTask) {
        const newTaskObj = {
            id: tasks.length + 1,
            nameTask: newTask,
            completed: false
        };
        
        tasks.push(newTaskObj);
        input.value = "";
        renderTasks(tasks);
        updateTaskCounters();
    }
});