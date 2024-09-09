const invio = document.getElementById("aggiungiTask");
const task = document.getElementById("inserisciTask");
const ul = document.querySelector("ul");

invio.addEventListener("click", function (event) {
  event.preventDefault();

  // Controllo per evitare task vuoti
  if (task.value.trim() === "") {
    alert("Inserisci un task valido.");
    return;
  }

  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  const p = document.createElement("p");
  const deleteTask = document.createElement("button");

  // Imposta la checkbox
  checkbox.type = "checkbox";
  li.appendChild(checkbox);

  // Imposta il testo del task
  p.textContent = task.value;
  li.appendChild(p);

  // Imposta il pulsante di eliminazione
  deleteTask.textContent = "Elimina";
  deleteTask.type = "button";
  li.appendChild(deleteTask);

  // Aggiunge il task alla lista
  ul.appendChild(li);

  // Aggiungi listener per eliminare il task
  deleteTask.addEventListener("click", function () {
    ul.removeChild(li);
  });

  // Aggiungi listener per completare il task
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      p.style.textDecoration = "line-through"; // Task completato
    } else {
      p.style.textDecoration = "none"; // Task non completato
    }
  });

  // Pulisci l'input del task
  task.value = "";

  // Riporta il focus sulla texarea
  task.focus();
});
