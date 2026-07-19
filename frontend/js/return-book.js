// ========================================
// RETURN BOOK API CONNECTED
// ========================================

const API_URL = "http://localhost:5000";


const tableBody = document.getElementById("returnTable");

let issues = [];



// ========================================
// LOAD ISSUED BOOKS
// ========================================

async function loadIssues(){


    try{


        const token = localStorage.getItem("token");


        const response = await fetch(`${API_URL}/issues`,{


            method:"GET",


            headers:{


                "Authorization": `Bearer ${token}`


            }


        });



        issues = await response.json();


        displayIssues(issues);



    }
    catch(error){

        console.log(error);

        alert("Unable to load issued books");

    }


}





// ========================================
// DISPLAY ISSUES
// ========================================

function displayIssues(data){


    tableBody.innerHTML = "";



    if(data.length === 0){


        tableBody.innerHTML = `

        <tr>

        <td colspan="6" class="text-center">

        No Issued Books Found

        </td>

        </tr>

        `;


        return;

    }





    data.forEach((issue,index)=>{


        tableBody.innerHTML += `


        <tr>


        <td>${index+1}</td>



        <td>

        ${issue.bookId ? issue.bookId.title : "-"}

        </td>



        <td>

        ${issue.memberId ? issue.memberId.name : "-"}

        </td>



        <td>

        ${new Date(issue.issueDate).toLocaleDateString()}

        </td>



        <td>

        ${new Date(issue.returnDate).toLocaleDateString()}

        </td>



        <td>



        ${
            issue.status === "Issued"

            ?

            `<button

            class="btn btn-success btn-sm return-btn"

            data-id="${issue._id}">

            Return

            </button>`

            :

            `<span class="badge bg-success">

            Returned

            </span>`

        }



        </td>



        </tr>


        `;


    });



    addReturnEvents();


}







// ========================================
// RETURN BUTTON
// ========================================

function addReturnEvents(){


    document.querySelectorAll(".return-btn")

    .forEach(button=>{


        button.onclick = async ()=>{


            const id = button.dataset.id;



            if(confirm("Return this book?")){


                try{


                    const token = localStorage.getItem("token");



                    const response = await fetch(

                        `${API_URL}/issues/${id}`,

                        {


                        method:"PUT",


                        headers:{


                            "Authorization": `Bearer ${token}`


                        }


                        }

                    );





                    const data = await response.json();




                    if(response.ok){


                        alert("Book Returned Successfully");


                        loadIssues();


                    }



                }
                catch(error){

                    console.log(error);

                }



            }


        };


    });


}







// START

loadIssues();


console.log("Return Book JS Loaded");