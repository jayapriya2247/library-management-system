// ========================================
// BOOKS CRUD (API CONNECTED)
// ========================================

const API_URL = "http://localhost:5000";

const tableBody = document.querySelector("tbody");

const searchInput = document.getElementById("searchBook");

let books = [];


// ========================================
// LOAD BOOKS FROM MONGODB
// ========================================

async function loadBooks(){

    try{

        const token = localStorage.getItem("token");


        const response = await fetch(`${API_URL}/books`, {

            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`
            }

        });


        books = await response.json();


        displayBooks(books);


    }
    catch(error){

        console.log(error);

        alert("Unable to load books");

    }

}



// ========================================
// DISPLAY BOOKS
// ========================================

function displayBooks(data){


    tableBody.innerHTML = "";


    if(data.length === 0){

        tableBody.innerHTML = `

        <tr>

            <td colspan="8" class="text-center">

                No Books Found

            </td>

        </tr>

        `;

        return;

    }



    data.forEach((book,index)=>{


        tableBody.innerHTML += `

        <tr>

            <td>${index + 1}</td>


            <td>📘</td>


            <td>${book.title}</td>


            <td>${book.author}</td>


            <td>₹ ${book.price}</td>


            <td>${book.quantity || 1}</td>


            <td>

                <span class="badge bg-success">

                    Available

                </span>

            </td>


            <td>


                <button

                class="btn btn-warning btn-sm edit-btn"

                data-id="${book._id}">

                    <i class="bi bi-pencil-square"></i>

                </button>



                <button

                class="btn btn-danger btn-sm delete-btn"

                data-id="${book._id}">

                    <i class="bi bi-trash"></i>

                </button>


            </td>


        </tr>

        `;


    });



    addDeleteEvents();

    addEditEvents();


}



// ========================================
// SEARCH
// ========================================

if(searchInput){


searchInput.addEventListener("keyup",()=>{


    const value = searchInput.value.toLowerCase();


    const filteredBooks = books.filter(book =>


        book.title.toLowerCase().includes(value)

        ||

        book.author.toLowerCase().includes(value)


    );


    displayBooks(filteredBooks);


});


}



// ========================================
// DELETE BOOK
// ========================================

function addDeleteEvents(){


    document.querySelectorAll(".delete-btn")

    .forEach(button=>{


        button.onclick = async ()=>{


            const id = button.dataset.id;


            if(confirm("Delete this book?")){


                try{


                    const token = localStorage.getItem("token");


                    const response = await fetch(

                        `${API_URL}/books/${id}`,

                        {

                            method:"DELETE",

                            headers:{

                                "Authorization": `Bearer ${token}`

                            }

                        }

                    );


                    if(response.ok){


                        alert("Book Deleted Successfully");


                        loadBooks();


                    }


                }

                catch(error){

                    console.log(error);

                }


            }


        };


    });


}



// ========================================
// EDIT BOOK
// ========================================

function addEditEvents(){


    document.querySelectorAll(".edit-btn")

    .forEach(button=>{


        button.onclick = ()=>{


            const id = button.dataset.id;


            localStorage.setItem("editBookId", id);


            window.location.href = "edit-book.html";


        };


    });


}



// ========================================
// ADD BOOK BUTTON
// ========================================

const addButton = document.querySelector(".btn-primary");


if(addButton){


    addButton.onclick = ()=>{


        window.location.href = "add-book.html";


    };


}



// ========================================
// START
// ========================================

loadBooks();