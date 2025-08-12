const API_URL = "http://localhost:3000/client";
const tableClient = document.getElementById("tableClient");
const clientForm = document.getElementById("clientForm");

// Load list
async function loadClient() {
    const res = await fetch(API_URL);
    const data = await res.json();

    tableClient.innerHTML = "";
    data.forEach(p => {
        tableClient.innerHTML += `
            <tr>
                <td>${p.client_id}</td>
                <td>${p.name}</td>
                <td>${p.identification_number}</td>
                <td>${p.adress}</td>
                <td>${p.phone}</td>
                <td>${p.email}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editClient(${p.client_id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteClient(${p.client_id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Save / Update
clientForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const client = {
        client_id: document.getElementById("client_id").value,
        name: document.getElementById("name").value,
        identification_number: document.getElementById("identification_number").value,
        adress: document.getElementById("adress").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value
    };

    const client_id = document.getElementById("client_id").value;

    if (client_id) {
        // UPDATE
        await fetch(`${API_URL}/${client_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(client)
        });
    } else {
        // CREATE
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(client)
        });
    }

    clientForm.reset();
    loadClient();
});

// Edit
window.editClient = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    const p = await res.json();

    document.getElementById("client_id").value = p.client_id;
    document.getElementById("name").value = p.name;
    document.getElementById("identification_number").value = p.identification_number;
    document.getElementById("adress").value = p.adress;
    document.getElementById("phone").value = p.phone;
    document.getElementById("email").value = p.email;
};

// Delete
window.deleteClient = async (id) => {
    if (confirm("Do you wan to delete this client?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        loadClient();
    }
};

// Initialize
loadClient();
