// ========================================
// DASHBOARD
// ========================================

const API_URL = "http://localhost:5000";

// ========================================
// LOAD DASHBOARD COUNTS
// ========================================

async function loadDashboard() {

    try {

        const response = await fetch(`${API_URL}/dashboard`);

        if (!response.ok) {
            throw new Error("Dashboard API Failed");
        }

        const data = await response.json();

        document.getElementById("totalBooks").innerText = data.totalBooks;
        document.getElementById("totalMembers").innerText = data.totalMembers;
        document.getElementById("issuedBooks").innerText = data.issuedBooks;
        document.getElementById("returnedBooks").innerText = data.returnedBooks;

    }
    catch (error) {

        console.error("Dashboard Error:", error);

    }

}

// ========================================
// LOAD RECENT BOOKS
// ========================================

async function loadRecentBooks() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/books`, {

            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`
            }

        });

        if (!response.ok) {
            throw new Error("Books API Failed");
        }

        const books = await response.json();

        const table = document.getElementById("bookTable");

        table.innerHTML = "";

        if (books.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">
                        No Books Found
                    </td>
                </tr>
            `;

            return;
        }

        books.slice(0, 5).forEach((book, index) => {

            table.innerHTML += `
                <tr>

                    <td>${index + 1}</td>

                    <td>${book.title}</td>

                    <td>${book.author}</td>

                    <td>₹${book.price}</td>

                    <td>
                        <span class="badge bg-success">
                            Available
                        </span>
                    </td>

                </tr>
            `;

        });

    }
    catch (error) {

        console.error("Books Error:", error);

    }

}

// ========================================
// START
// ========================================

window.onload = function () {

    loadDashboard();

    loadRecentBooks();

};