// ===============================
// ADD BOOK MODULE (API CONNECTED)
// ===============================

const API_URL = "http://localhost:5000";

const bookForm = document.getElementById("bookForm");


bookForm.addEventListener("submit", async function(e){

    e.preventDefault();


    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const price = document.getElementById("price").value;


    if(title === "" || author === ""){

        alert("Book Title and Author are required!");
        return;

    }


    const bookData = {

        title: title,
        author: author,
        price: Number(price)

    };


    try{


        const token = localStorage.getItem("token");


        const response = await fetch(`${API_URL}/books`,{

            method:"POST",

            headers:{

                "Content-Type":"application/json",

                "Authorization": `Bearer ${token}`

            },


            body: JSON.stringify(bookData)

        });



        const data = await response.json();



        if(response.ok){


            alert("Book Added Successfully!");


            bookForm.reset();


            window.location.href = "books.html";


        }
        else{

            alert(data.error || "Book add failed");

        }


    }
    catch(error){

        console.log(error);

        alert("Server not connected");

    }


});


console.log("Add Book API Module Loaded");