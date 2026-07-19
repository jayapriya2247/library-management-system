const API_URL = "http://localhost:5000";

document.getElementById("loginForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    const response = await fetch(`${API_URL}/users/login`, {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            email,
            password
        })

    });


    const data = await response.json();


    if(response.ok){

        localStorage.setItem("token", data.token);

        alert("Login Successful");

        window.location.href="dashboard.html";

    }
    else{

        alert(data.message);

    }

});