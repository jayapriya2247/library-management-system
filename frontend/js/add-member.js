// ========================================
// ADD MEMBER API CONNECTED
// ========================================

const API_URL = "http://localhost:5000";


const memberForm = document.getElementById("memberForm");



memberForm.addEventListener("submit", async function(e){


    e.preventDefault();



    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const address = document.getElementById("address").value.trim();



    const memberData = {

        name:name,

        email:email,

        phone:phone,

        address:address

    };



    try{


        const token = localStorage.getItem("token");



        const response = await fetch(`${API_URL}/members`,{


            method:"POST",


            headers:{


                "Content-Type":"application/json",


                "Authorization": `Bearer ${token}`


            },


            body:JSON.stringify(memberData)



        });





        const data = await response.json();




        if(response.ok){


            alert("Member Added Successfully!");



            memberForm.reset();



            window.location.href="members.html";



        }

        else{


            alert(data.error || "Member add failed");


        }



    }

    catch(error){


        console.log(error);


        alert("Server not connected");


    }



});


console.log("Add Member API Loaded");