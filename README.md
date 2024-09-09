# To-Do List App

## Descrizione del progetto
La **To-Do List App** è un'applicazione web realizzata in JavaScript che consente agli utenti di gestire le proprie attività. Include funzionalità come aggiungere nuove task, segnare come completate, eliminare task, salvare i dati in Local Storage e altro ancora. Il progetto è suddiviso in milestone che affrontano aspetti chiave dello sviluppo frontend, come la manipolazione del DOM, eventi, programmazione asincrona e persistenza dei dati.

## Funzionalità principali
1. **Aggiunta di task**: Gli utenti possono inserire nuove task nella lista.
2. **Gestione delle task**: Ogni task può essere marcata come completata o eliminata.
3. **Persistenza dati**: Le task vengono salvate nel Local Storage del browser.
4. **Filtraggio**: Possibilità di filtrare le task in base al loro stato (completate o non completate).
5. **Barra di ricerca**: Gli utenti possono cercare tra le task inserite.
6. **Drag & Drop**: Supporto per il drag-and-drop per riordinare le task.
7. **Sincronizzazione asincrona**: (Opzionale) Sincronizza le task con un server remoto usando la Fetch API.

## Struttura del progetto

### Milestone 1: Impostare l'ambiente e creare la struttura HTML/CSS di base
- Creazione della struttura HTML semantica utilizzando `<form>`, `<input>`, `<button>`, e `<ul>`.
- Aggiunta di stili CSS per una semplice interfaccia user-friendly utilizzando Flexbox o Grid layout.

### Milestone 2: Aggiungere interattività con JavaScript
- Utilizzo di `addEventListener()` per ascoltare gli eventi come l'invio del form.
- Creazione e manipolazione dinamica del DOM con metodi come `createElement()`, `appendChild()`, e `querySelector()`.

### Milestone 3: Gestire lo stato delle task (completato/non completato) e cancellazione
- Aggiunta di una checkbox per segnare le task come completate.
- Aggiunta di un pulsante per eliminare le task dalla lista.
- Rimozione di elementi dalla lista con `removeChild()`.

### Milestone 4: Salvare le task in Local Storage
- Utilizzo di `localStorage.setItem()` e `localStorage.getItem()` per memorizzare e recuperare le task.
- Serializzazione dei dati con `JSON.stringify()` e `JSON.parse()`.

### Milestone 5: Refactor del codice (Modularità e DRY)
- Riorganizzazione del codice per migliorarne la leggibilità e mantenibilità.
- Separazione delle funzionalità in funzioni modulari e riutilizzabili.
- Possibile utilizzo di pattern come il Module Pattern o classi ES6.

### Milestone 6: Aggiungere funzionalità avanzate (Filtraggio, Ricerca, Drag & Drop)
- Filtraggio delle task in base al loro stato (completate/non completate).
- Implementazione di una barra di ricerca per filtrare le task dinamicamente.
- Drag and Drop per riordinare le task usando le API HTML5.

### Milestone 7: Asincronismo e Fetch API (feature bonus)
- Integrazione con un backend (es. API JSON) per salvare le task su un server remoto.
- Gestione delle richieste asincrone con la Fetch API e gestione degli errori.

### Milestone 8: Ottimizzazione e Preparazione per il Colloquio
- Ottimizzazione delle performance e del numero di operazioni sul DOM.
- Testing delle funzionalità e debugging.
- Preparazione alle domande di colloquio, spiegando come funziona l'applicazione e le scelte tecniche adottate.

## Tecnologie utilizzate
- **HTML5**: Per la struttura semantica della pagina.
- **CSS3**: Per il layout e lo stile dell'applicazione.
- **JavaScript (ES6)**: Per la logica dell'app, la manipolazione del DOM e le interazioni con l'utente.
- **Local Storage**: Per la persistenza dei dati sul lato client.
- **Fetch API**: (Opzionale) Per interazioni asincrone con server esterni.

## Requisiti di sistema
- Browser moderno compatibile con ES6 (JavaScript) e Local Storage.
- (Opzionale) Server backend o API per la sincronizzazione remota.

