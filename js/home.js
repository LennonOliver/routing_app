const home = {}



home.saveUser = async (event) => {
    event.preventDefault();
    const form = document.querySelector('#formulaire');
    const firstname = document.querySelector('#firstname').value;
    const lastname = document.querySelector('#lastname').value;
    await db.addUser({ firstname, lastname });
    form.reset();
    displayUsers();
}
const displayUsers = () => {
    db.getAllUsers().then(users => {
        const tbody = document.querySelector('#tbody');
        tbody.innerHTML = "";
        users.forEach(user => {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            td1.textContent = `${user.id}`;
            td2.textContent = `${user.firstname}`;
            td3.textContent = `${user.lastname}`;
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tbody.appendChild(tr);
        });
    })
};

displayUsers();