document.addEventListener("DOMContentLoaded", function () {
  const invio = document.getElementById("aggiungiTask");
  const task = document.getElementById("inserisciTask");
  const ul = document.querySelector("ul");

  const localStorageTasksKey = "tasks";
  const filterSelect = document.getElementById("filterSelect");
  const searchInput = document.getElementById("searchTask");

  let currentSearch = "";
  let currentFilter = "all";
  let draggedElement = null;

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
  const generateUniqueId = () =>
    "_" + Math.random().toString(36).substring(2, 9);

  // Crea un elemento HTML per una task
  const createTaskElement = (taskId, taskText, isCompleted = false) => {
    const li = document.createElement("li");
    li.setAttribute("draggable", true);
    li.dataset.id = taskId;

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

    li.addEventListener("dragstart", (e) => {
      draggedElement = li;
      setTimeout(() => li.classList.add("dragging"), 0); // Aggiungi classe per lo stile durante il drag
    });

    li.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.effectAllowed = "move";
      if (draggedElement !== li) {
        li.classList.add("dragover");
      }
    });

    li.addEventListener("dragleave", () => {
      li.classList.remove("dragover");
    });

    li.addEventListener("drop", (e) => {
      e.preventDefault();
      li.classList.remove("dragover");

      if (draggedElement !== li) {
        const allItems = Array.from(ul.children);
        const draggedIndex = allItems.indexOf(draggedElement);
        const targetIndex = allItems.indexOf(li);

        // Se il draggedElement è più grande o uguale all'indice di li
        if (draggedIndex < targetIndex) {
          ul.insertBefore(draggedElement, li.nextSibling);
        } else {
          ul.insertBefore(draggedElement, li);
        }
        reorderTasks();
      }
    });

    li.addEventListener("dragend", () => {
      draggedElement.classList.remove("dragging");
      draggedElement = null;
    });

    return li;
  };

  const addTaskToList = (taskId, taskText, isCompleted = false) => {
    const taskElement = createTaskElement(taskId, taskText, isCompleted);
    ul.appendChild(taskElement);
  };

  const loadTasksFromLocalStorage = () => {
    const taskList = getTasksFromLocalStorage();
    taskList.forEach(({ id, text, completed }) =>
      addTaskToList(id, text, completed)
    );
  };

  const taskExists = (taskText) => {
    const taskList = getTasksFromLocalStorage();
    return taskList.some((task) => task.text === taskText);
  };

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

    addTaskToList(taskId, taskText);
    addTaskToLocalStorage(taskId, taskText);

    task.value = "";
    task.focus();
  };

  const reorderTasks = () => {
    const taskElements = ul.querySelectorAll("li");
    const newTaskList = [];

    taskElements.forEach((li) => {
      const taskId = li.dataset.id;
      const taskText = li.querySelector("p").textContent;
      const isCompleted = li.querySelector("input[type='checkbox']").checked;

      newTaskList.push({
        id: taskId,
        text: taskText,
        completed: isCompleted,
      });
    });

    saveTasksToLocalStorage(newTaskList);
  };

  loadTasksFromLocalStorage();

  invio.addEventListener("click", (event) => {
    event.preventDefault();
    aggiungiTask();
  });

  task.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      aggiungiTask();
    }
  });

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
