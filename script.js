document.addEventListener("DOMContentLoaded", function () {
  const invio = document.getElementById("aggiungiTask");
  const task = document.getElementById("inserisciTask");
  const ul = document.querySelector("ul");

  const localStorageTasksKey = "tasks";

  const filterSelect = document.getElementById("filterSelect");

  const searchInput = document.getElementById("searchTask");

  let currentSearch = "";
  let currentFilter = "all";

  // Recupera le task dal Local Storage
  const getTasksFromLocalStorage = () =>
    JSON.parse(localStorage.getItem(localStorageTasksKey)) || [];

  // Salva le task nel Local Storage
  const saveTasksToLocalStorage = (taskList) =>
    localStorage.setItem(localStorageTasksKey, JSON.stringify(taskList));

  // Aggiunge una task al Local Storage
  const addTaskToLocalStorage = (taskId, taskText, isCompleted = false) => {
    const taskList = getTasksFromLocalStorage();
    taskList.push({ id: taskId, text: taskText, completed: isCompleted });
    saveTasksToLocalStorage(taskList);
  };

  // Rimuove una task dal Local Storage
  const removeTaskFromLocalStorage = (taskId) => {
    let taskList = getTasksFromLocalStorage();
    taskList = taskList.filter((task) => task.id !== taskId);
    saveTasksToLocalStorage(taskList);
  };

  // Aggiorna lo stato di completamento di una task nel Local Storage
  const updateTaskCompletionInLocalStorage = (taskId, isCompleted) => {
    const taskList = getTasksFromLocalStorage();
    const updatedTaskList = taskList.map((task) =>
      task.id === taskId ? { ...task, completed: isCompleted } : task
    );
    saveTasksToLocalStorage(updatedTaskList);
  };

  // Funzione per generare un ID unico per ogni task
  const generateUniqueId = () => "_" + Math.random().toString(36);

  // Crea un elemento HTML per una task
  const createTaskElement = (taskId, taskText, isCompleted = false) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;

    const p = document.createElement("p");
    p.textContent = taskText;
    if (isCompleted) {
      p.style.textDecoration = "line-through";
      p.style.color = "#ff4b5c";
    }

    const deleteTask = document.createElement("button");
    deleteTask.textContent = "Elimina";
    deleteTask.type = "button";

    li.append(checkbox, p, deleteTask);

    // Listener per la rimozione della task
    deleteTask.addEventListener("click", () => {
      ul.removeChild(li);
      removeTaskFromLocalStorage(taskId);
    });

    // Listener per il cambiamento dello stato della checkbox
    checkbox.addEventListener("change", () => {
      const isChecked = checkbox.checked;
      p.style.textDecoration = isChecked ? "line-through" : "none";
      p.style.color = isChecked ? "#ff4b5c" : "";
      updateTaskCompletionInLocalStorage(taskId, isChecked);
    });

    return li;
  };

  // Aggiungi una task alla lista visiva
  const addTaskToList = (taskId, taskText, isCompleted = false) => {
    const taskElement = createTaskElement(taskId, taskText, isCompleted);
    ul.appendChild(taskElement);
  };

  // Carica le task dal Local Storage e aggiungile alla lista
  const loadTasksFromLocalStorage = () => {
    const taskList = getTasksFromLocalStorage();
    taskList.forEach(({ id, text, completed }) =>
      addTaskToList(id, text, completed)
    );
  };

  // Controlla se una task esiste già nella lista
  const taskExists = (taskText) => {
    const taskList = getTasksFromLocalStorage();
    return taskList.some((task) => task.text === taskText);
  };

  // Funzione per aggiungere una task
  const aggiungiTask = () => {
    const taskText = task.value.trim();
    if (!taskText) {
      alert("Inserisci un task valido.");
      return;
    }

    if (taskExists(taskText)) {
      alert("La task esiste già.");
      return;
    }

    const taskId = generateUniqueId();

    // Aggiungi la task alla lista visiva e al Local Storage
    addTaskToList(taskId, taskText);
    addTaskToLocalStorage(taskId, taskText);

    // Pulisci l'input e riportalo in focus
    task.value = "";
    task.focus();
  };

  // Al caricamento della pagina, carica le task salvate
  loadTasksFromLocalStorage();

  // Aggiungi una nuova task al click del bottone
  invio.addEventListener("click", (event) => {
    event.preventDefault();
    aggiungiTask();
  });

  // Aggiungi una nuova task premendo Invio nella textarea
  task.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Impedisce l'inserimento di una nuova riga
      aggiungiTask(); // Chiama la funzione per aggiungere la task
    }
  });

  //Filtro Task

  function searchAndFilterTask() {
    const allTask = ul.querySelectorAll("li");
    allTask.forEach((task) => {
      const taskText = task.querySelector("p").textContent.toLowerCase();
      const isCompleted = task.querySelector("input[type='checkbox']").checked;
      const isMatch = taskText.includes(currentSearch.toLowerCase());
      let matchesFilter = true;

      if (currentFilter === "completed") {
        matchesFilter = isCompleted;
      } else if (currentFilter === "pending") {
        matchesFilter = !isCompleted;
      }

      if (matchesFilter && isMatch) {
        task.style.display = "";
      } else {
        task.style.display = "none";
      }
    });
  }
  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    searchAndFilterTask();
  });

  filterSelect.addEventListener("change", (e) => {
    currentFilter = e.target.value;
    searchAndFilterTask();
  });
});
