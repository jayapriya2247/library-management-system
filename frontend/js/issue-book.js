// ========================================
// ISSUE BOOK API CONNECTED
// ========================================

const API_URL = "http://localhost:5000";


const bookSelect = document.getElementById("bookId");

const memberSelect = document.getElementById("memberId");

const issueForm = document.getElementById("issueForm");



// ========================================
// LOAD BOOKS
// ========================================

async function loadBooks(){

    try{

        const response = await fetch(`${API_URL}/books`);

        const books = await response.json();


        books.forEach(book=>{


            bookSelect.innerHTML += `

            <option value="${book._id}">

            ${book.title}

            </option>

            `;


        });


    }
    catch(error){

        console.log(error);

    }

}





// ========================================
// LOAD MEMBERS
// ========================================

async function loadMembers(){


    try{


        const response = await fetch(`${API_URL}/members`);


        const members = await response.json();



        members.forEach(member=>{


            memberSelect.innerHTML += `


            <option value="${member._id}">

            ${member.name}

            </option>


            `;


        });



    }
    catch(error){

        console.log(error);

    }


}







// ========================================
// ISSUE BOOK
// ========================================


issueForm.addEventListener("submit", async function(e){


    e.preventDefault();



    const bookId = bookSelect.value;


    const memberId = memberSelect.value;


    const returnDate = document.getElementById("returnDate").value;




    const issueData = {


        bookId,

        memberId,

        returnDate


    };





    try{


        const token = localStorage.getItem("token");



        const response = await fetch(`${API_URL}/issues`,{


            method:"POST",


            headers:{


                "Content-Type":"application/json",


                "Authorization":`Bearer ${token}`


            },


            body:JSON.stringify(issueData)



        });





        const data = await response.json();




        if(response.ok){


            alert("Book Issued Successfully!");

            issueForm.reset();


        }

        else{


            alert(data.error || "Issue failed");


        }



    }
    catch(error){


        console.log(error);


        alert("Server not connected");


    }



});






// START

loadBooks();

loadMembers();


console.log("Issue Book JS Loaded");