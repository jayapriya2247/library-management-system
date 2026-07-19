// ========================================
// MEMBERS CRUD (API CONNECTED)
// ========================================

const API_URL = "http://localhost:5000";


const memberTable = document.getElementById("memberTable");


let members = [];



// ========================================
// LOAD MEMBERS
// ========================================

async function loadMembers(){


    try{


        const token = localStorage.getItem("token");


        const response = await fetch(`${API_URL}/members`,{

            method:"GET",

            headers:{

                "Authorization": `Bearer ${token}`

            }

        });



        members = await response.json();


        displayMembers(members);



    }
    catch(error){

        console.log(error);

        alert("Unable to load members");

    }


}



// ========================================
// DISPLAY MEMBERS
// ========================================

function displayMembers(data){


    memberTable.innerHTML = "";



    if(data.length === 0){


        memberTable.innerHTML = `

        <tr>

        <td colspan="6" class="text-center">

        No Members Found

        </td>

        </tr>

        `;


        return;

    }




    data.forEach((member,index)=>{


        memberTable.innerHTML += `


        <tr>


        <td>${index+1}</td>


        <td>${member.name}</td>


        <td>${member.email}</td>


        <td>${member.phone}</td>


        <td>${member.address || "-"}</td>



        <td>


        <button

        class="btn btn-danger btn-sm delete-btn"

        data-id="${member._id}">


        <i class="bi bi-trash"></i>


        </button>


        </td>


        </tr>


        `;


    });



    deleteMember();


}





// ========================================
// DELETE MEMBER
// ========================================

function deleteMember(){


    document.querySelectorAll(".delete-btn")

    .forEach(button=>{


        button.onclick = async ()=>{


            const id = button.dataset.id;



            if(confirm("Delete this member?")){


                const token = localStorage.getItem("token");



                const response = await fetch(

                    `${API_URL}/members/${id}`,

                    {

                    method:"DELETE",

                    headers:{

                        "Authorization": `Bearer ${token}`

                    }


                    }

                );



                if(response.ok){


                    alert("Member Deleted Successfully");


                    loadMembers();


                }


            }


        };


    });


}





// ========================================
// ADD MEMBER BUTTON
// ========================================

document.getElementById("addMemberBtn")

.onclick = ()=>{


    window.location.href="add-member.html";


};





// START

loadMembers();