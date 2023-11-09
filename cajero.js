var users = [
    { username: "Giovanni", password: "123", balance: 200 },
    { username: "Franco", password: "456", balance: 290 },
    { username: "Fernando", password: "789", balance: 67 },
];

var currentUser = null;

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var usernameInput = document.getElementById("username");
    var passwordInput = document.getElementById("password");

    for (var i = 0; i < users.length; i++) {
        if (usernameInput.value === users[i].username && passwordInput.value === users[i].password) {
            currentUser = i;
            showUserPanel();
            return;
        }
    }
    alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    usernameInput.value = "";
    passwordInput.value = "";
});

document.getElementById("showBalance").addEventListener("click", function() {
    updateBalance();
});

document.getElementById("deposit").addEventListener("click", function() {
    var amountInput = document.getElementById("amount");
    var amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        alert("Por favor, ingresa un monto válido.");
        return;
    }

    if (users[currentUser].balance + amount > 990) {
        alert("No puedes tener más de $990 en tu cuenta.");
        return;
    }

    users[currentUser].balance += amount;
    updateBalance();
    amountInput.value = "";
});

document.getElementById("withdraw").addEventListener("click", function() {
    var amountInput = document.getElementById("amount");
    var amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        alert("Por favor, ingresa un monto válido.");
        return;
    }

    if (users[currentUser].balance - amount < 10) {
        alert("No puedes tener menos de $10 en tu cuenta.");
        return;
    }

    users[currentUser].balance -= amount;
    updateBalance();
    amountInput.value = "";
});

document.getElementById("logout").addEventListener("click", function() {
    currentUser = null;
    hideUserPanel();
});

function showUserPanel() {
    document.getElementById("userTitle").textContent = "Bienvenido, " + users[currentUser].username;
    updateBalance();
    document.querySelector(".operations").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
}

function hideUserPanel() {
    document.getElementById("loginForm").style.display = "block";
    document.querySelector(".operations").style.display = "none";
}

function updateBalance() {
    var balanceSpan = document.getElementById("balance");
    balanceSpan.textContent = users[currentUser].balance;
}