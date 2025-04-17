function validateForm(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem(
            "usuarioLogado",
            JSON.stringify({
              id: data.user.id,
              nome: data.user.nome,
              email: data.user.email,
              senha: data.user.senha,
            })
          );
          window.location.href = "/home.html";
        } else {
          document.getElementById("errorMessage").textContent =
            "Usuário ou senha inválidos.";
        }
      })
      .catch(() => {
        document.getElementById("errorMessage").textContent =
          "Erro ao conectar com o servidor.";
      });
  }
  
  document.getElementById("loginForm").addEventListener("submit", validateForm);
  