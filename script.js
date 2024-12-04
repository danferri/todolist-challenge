const formUser = document.querySelector(".add-user-form");
//const formTask = document.querySelector(".task-form");
const nameInput = document.getElementById("name");
const imageUrl = document.getElementById("url-image");
//const taskInput = document.querySelector("input");
 
let editMode = null;

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function loadUsers() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

function addUsers() {
  const users = loadUsers();
  const userList = document.querySelector(".user-list");
  userList.innerHTML = "";

  users.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-card");
    userDiv.dataset.id = user.id;

    userDiv.innerHTML = `
      <div class="user-header">
        <div class="user-info">
          <img src="${user.image}" alt="user-image" class="user-avatar">
          <span class="user-name">${user.name}</span>
        </div>
        <div class="user-actions">
          <button class="btn btn-edit">✎</button>
          <button class="btn btn-delete">🗑</button>
        </div>
      </div>
      <ul class="task-list"></ul>
      <form class="task-form">
        <input type="text" id="task" placeholder="Novo afazer" required>
        <button type="submit" class="btn btn-add">+ Adicionar Tarefa</button>
      </form>      
    `;

    const editButton = userDiv.querySelector(".btn-edit");
    const deleteButton = userDiv.querySelector(".btn-delete");
        
    editButton.addEventListener("click", () => editUser(user.id));
    deleteButton.addEventListener("click", () => deleteUser(user.id));
    
    userList.appendChild(userDiv);
  });
}

function editUser(userId) {
  const users = loadUsers();
  const userEdit = users.find((user) => user.id === userId);

  if(userEdit) {
    nameInput.value = userEdit.name;
    imageUrl.value = userEdit.image;
    nameInput.dataset.userId = userEdit.id;
  }
}

function deleteUser(userId) {
  let users = loadUsers();

  users = users.filter((user) => user.id !== userId);
  saveUsers(users);
  addUsers();
}


formUser.addEventListener("submit", (event) => {
  event.preventDefault();

  const userName = nameInput.value.trim();
  const userImage = imageUrl.value.trim();
  let users = loadUsers();
    

  if(userName && userImage) {    
    const userIndex = users.findIndex((user) => user.id === parseInt(nameInput.dataset.userId));

    if(userIndex !== -1) {
      users[userIndex].name = userName;
      users[userIndex].image = userImage;

      delete nameInput.dataset.userId;
    } else {
      let userId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
      const newUser = {
        id: userId,
        name: userName,
        image: userImage,
        afazeres: []
      };
      users.push(newUser);
    }     

    saveUsers(users);
    
    nameInput.value = "";
    imageUrl.value = "";
    
    addUsers();
  }    
});

document.addEventListener("submit", (event) => {
  if(event.target.classList.contains("task-form")) {
  event.preventDefault();  
  
  const taskInput = event.target.querySelector("input#task");
  const taskText = taskInput.value.trim();
  const userId = parseInt(event.target.closest(".user-card").dataset.id, 10);

    if(taskText) {
      const users = loadUsers();
      const userIndex = users.findIndex((user) => user.id === userId);
      
      if (userIndex !== -1) {
        const newTask = {
          tarefa: taskText,
          completed: false
        };
        users[userIndex].afazeres.push(newTask);        
                
        saveUsers(users);        

        taskInput.value = "";
      } 

    }  
  }
});

document.addEventListener("DOMContentLoaded", () => {
  addUsers();
});