const invio = document.getElementById("aggiungiTask");
const task = document.getElementById("inserisciTask");
const ul = document.querySelector("ul");

// Funzioni di gestione del Local Storage
const localStorageTasksKey = "tasks";

const getTasksFromLocalStorage = () =>
  JSON.parse(localStorage.getItem(localStorageTasksKey)) || [];
const saveTasksToLocalStorage = (taskList) =>
  localStorage.setItem(localStorageTasksKey, JSON.stringify(taskList));

// Aggiunge una nuova task nel Local Storage
const addTaskToLocalStorage = (taskText, isCompleted = false) => {
  const taskList = getTasksFromLocalStorage();
  taskList.push({ text: taskText, completed: isCompleted });
  saveTasksToLocalStorage(taskList);
};

// Rimuove una task dal Local Storage
const removeTaskFromLocalStorage = (taskText) => {
  let taskList = getTasksFromLocalStorage();
  taskList = taskList.filter((task) => task.text !== taskText);
  saveTasksToLocalStorage(taskList);
};

// Aggiorna lo stato di completamento di una task nel Local Storage
const updateTaskCompletionInLocalStorage = (taskText, isCompleted) => {
  const taskList = getTasksFromLocalStorage();
  const updatedTaskList = taskList.map((task) =>
    task.text === taskText ? { ...task, completed: isCompleted } : task
  );
  saveTasksToLocalStorage(updatedTaskList);
};

// Funzione per creare una task visivamente
const createTaskElement = (taskText, isCompleted = false) => {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isCompleted;

  const p = document.createElement("p");
  p.textContent = taskText;
  if (isCompleted) {
    p.style.textDecoration = "line-through";
    p.style.color = "red";
  }

  const deleteTask = document.createElement("button");
  deleteTask.textContent = "Elimina";
  deleteTask.type = "button";

  li.append(checkbox, p, deleteTask);

  // Listener per rimozione del task
  deleteTask.addEventListener("click", () => {
    ul.removeChild(li);
    removeTaskFromLocalStorage(taskText);
  });

  // Listener per lo stato di completamento del task
  checkbox.addEventListener("change", () => {
    const isChecked = checkbox.checked;
    p.style.textDecoration = isChecked ? "line-through" : "none";
    p.style.color = isChecked ? "red" : "";
    updateTaskCompletionInLocalStorage(taskText, isChecked);
  });

  return li;
};

// Funzione per aggiungere una task alla lista visiva
const addTaskToList = (taskText, isCompleted = false) => {
  const taskElement = createTaskElement(taskText, isCompleted);
  ul.appendChild(taskElement);
};

// Funzione per caricare le task salvate dal Local Storage
const loadTasksFromLocalStorage = () => {
  const taskList = getTasksFromLocalStorage();
  taskList.forEach(({ text, completed }) => addTaskToList(text, completed));
};

// Al caricamento della pagina, carica le task salvate
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

// Aggiungere una nuova task al click del bottone
invio.addEventListener("click", (event) => {
  event.preventDefault();

  const taskText = task.value.trim();
  if (!taskText) {
    alert("Inserisci un task valido.");
    return;
  }

  // Aggiungi la task alla lista visiva e al Local Storage
  addTaskToList(taskText);
  addTaskToLocalStorage(taskText);

  // Pulisci l'input e riportalo in focus
  task.value = "";
  task.focus();
});
