const API_URL = "http://localhost:9090/students";

// Fetch and display students
function fetchStudents() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            let tableBody = document.getElementById("studentTableBody");
            tableBody.innerHTML = "";
            data.forEach(student => {
                let row = `<tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.age}</td>
                    <td>
                    <button class="btn btn-warning" onclick="updateStudent(${student.id})">Edit</button>

                        <button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        });
}

// Add new student
document.getElementById("studentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, age })
    }).then(() => {
        fetchStudents();
        document.getElementById("studentForm").reset();
    });
});

// Delete student
function deleteStudent(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => fetchStudents());
}

// Edit student
function updateStudent(id) {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let age = document.getElementById("age").value;

    fetch(`http://localhost:9090/students/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            age: age,
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert("Student updated successfully!");
        location.reload(); // Refresh the table to reflect changes
    })
    .catch(error => console.error("Error:", error));
}

// Load students on page load
fetchStudents();
