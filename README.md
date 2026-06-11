# ✅ ToDo List - Task Management Web App

![HTML](https://img.shields.io/badge/HTML-17.2%25-orange?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-26.4%25-blue?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-56.4%25-yellow?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A lightweight browser-based **To-Do List** application created as a university programming project for **WSIiZ**.  
The app helps users organize tasks, track progress, set deadlines, and keep task data saved in the browser.

## 🔗 Live Demo

👉 **[Open the app](https://oleksichek.github.io/ToDo-List/)**  
📦 **[Source code](https://github.com/Oleksichek/ToDo-List)**

## ✨ Features

- ➕ Add new tasks dynamically
- ✏️ Edit task names through a pop-up form
- 🗑️ Remove selected tasks from the list
- 📅 Set and update task deadlines
- 📌 Track progress with task statuses:
  - `To do`
  - `In Progress`
  - `In review`
  - `Completed`
- 🎨 Color-coded status indicators for better readability
- 💾 Save task data in browser cookies
- 🌐 Runs directly in the browser without backend setup

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| **HTML** | Page structure and task table layout |
| **CSS** | Styling, layout, buttons, pop-up, and visual states |
| **JavaScript** | Dynamic task logic, DOM manipulation, events, and data persistence |
| **GitHub Pages** | Static deployment and live hosting |

## 📁 Project Structure

```text
ToDo-List/
├── css/
│   └── mainStyle.css
├── images/
│   ├── del.png
│   ├── edit.png
│   ├── logov1.jpg
│   └── logov2.jpg
├── js/
│   └── mainScript.js
├── index.html
├── LICENSE
└── README.md
```

## 🧠 How It Works

The application uses a JavaScript `TaskItem` class to represent every task in the interface.  
Each task stores its own ID, name, status, deadline, and related HTML element.

Main JavaScript responsibilities include:

- creating task rows from an HTML template
- assigning unique task IDs
- updating task names, statuses, and deadlines
- deleting tasks from the table
- saving, updating, and loading task data from browser cookies

## 📌 Project Goals

The main goal of this project was to build a simple, practical task-management tool that allows users to:

- create tasks and events
- edit existing task data
- remove completed or unnecessary tasks
- set deadlines
- track the current stage of task completion
- keep entered data available after page reloads

## 👥 Authors

- [**Oleksichek**](https://github.com/Oleksichek)
- [**iSweetyBread**](https://github.com/iSweetyBread)

## 📄 License

This project is licensed under the **MIT License**.
