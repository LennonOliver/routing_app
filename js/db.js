const db = {
    instance: new Dexie('routing'),
}

const firstname = document.querySelector('#firstname');
const lastname = document.querySelector('#lastname');
const btnSubmit = document.querySelector('#submit');

btnSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    db.addUser({firstname: firstname.value, lastname: lastname.value});
})

db.init = () => {
    db.instance.version(1).stores({
        users: `
            ++id,
            firstname,
            lastname`,
        address: `
            userId,
            street,
            number,
            zipCode,
            city,
            country`,
    });
}

db.addUser = (user) => {
    db.instance.users.add(user);
}

