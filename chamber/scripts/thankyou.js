const params = new URLSearchParams(window.location.search);

document.getElementById("first").textContent = params.get("firstName");
document.getElementById("last").textContent = params.get("lastName");
document.getElementById("email").textContent = params.get("email");
document.getElementById("phone").textContent = params.get("phone");
document.getElementById("org").textContent = params.get("organization");
document.getElementById("time").textContent = params.get("timestamp");
