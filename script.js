const form = document.querySelector(".add-user-form");
const nameInput = document.getElementById("name");
const urlImageInput = document.getElementById("url-image");

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function loadUsers() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}


form.addEventListener("submit", (event) => {
  event.preventDefault(); //não sei se é necessário, mas vou deixar

  const userName = nameInput.value.trim();
  const userImage = urlImageInput.value.trim();
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
    urlImageInput.value = "";

    // Debugg, só pra ter certeza que listener funcionou
    alert("Usuário adicionado com sucesso!");
  } else {
    alert("Por favor, preencha todos os campos!");
  }
});



