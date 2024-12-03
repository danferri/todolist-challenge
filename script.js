const form = document.querySelector(".add-user-form");
const nameInput = document.getElementById("name");
const imageUrl = document.getElementById("url-image");

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
    const userDiv = document.createElement("div")
    userDiv.classList.add("user-card")
    userDiv.innerHTML = `
      <div class="user-info">
        <img scr ="${user.image}" alt="user-image" class="user-avatar">
        <span class="user-name">${user.name}</span>
      </div>
      <div class="user-actions">
        <button class="btn btn-edit">✎</button>
        <button class="btn btn-delete">🗑</button>
      </div>
      <ul class="task-list"></ul>
      <form class="task-form">
        <input type="text" placeholder="Novo afazer" required>
        <button type="submit" class="btn btn-add">+ Adicionar Tarefa</button>
      </form>      
    `;
    userList.appendChild(userDiv);
  });
}


form.addEventListener("submit", (event) => {
  event.preventDefault(); //não sei se é necessário, mas vou deixar

  const userName = nameInput.value.trim();
  const userImage = imageUrl.value.trim();
  const users = loadUsers();
  let userId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;  

  if (userName && userImage) {    
    
    const newUser = {
      id: userId,
      name: userName,
      image: userImage,
      afazeres: []
    };
        
    users.push(newUser);
    saveUsers(users);
    
    nameInput.value = "";
    imageUrl.value = "";
    addUsers();

    // Debugg, só pra ter certeza que listener funcionou
    alert("Usuário adicionado com sucesso!");
  } else {
    alert("Por favor, preencha todos os campos!");
  }
});

document.addEventListener("DOMContentLoaded", () =>{
  addUsers();
})