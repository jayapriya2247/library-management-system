// ========================================
// EDIT BOOK (API CONNECTED)
// ========================================

const API_URL = "http://localhost:5000";

const editForm = document.getElementById("editBookForm");

const bookId = localStorage.getItem("editBookId");
console.log("Book ID:", bookId);


// ========================================
// LOAD BOOK DETAILS
// ========================================

async function loadBook(){

    try{

        const token = localStorage.getItem("token");


        const response = await fetch(
            `${API_URL}/books/${bookId}`,
            {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        const book = await response.json();


        document.getElementById("title").value = book.title;

        document.getElementById("author").value = book.author;

        document.getElementById("price").value = book.price;


    }
    catch(error){

        console.log(error);

    }

}



// ========================================
// UPDATE BOOK
// ========================================

editForm.addEventListener("submit", async function(e){

    e.preventDefault();


    const updatedBook = {

        title: document.getElementById("title").value,

        author: document.getElementById("author").value,

        price: Number(document.getElementById("price").value)

    };


    try{


        const token = localStorage.getItem("token");


        const response = await fetch(

            `${API_URL}/books/${bookId}`,

            {

            method:"PUT",

            headers:{

                "Content-Type":"application/json",

                "Authorization": `Bearer ${token}`

            },


            body:JSON.stringify(updatedBook)


            }

        );



        const data = await response.json();



        if(response.ok){


            alert("Book Updated Successfully");


            window.location.href="books.html";


        }
        else{

            alert(data.error);

        }


    }

    catch(error){

        console.log(error);

    }


});



loadBook();