const db = {
    instance: new Dexie('routing'),
}

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
    db.instance.users.add(user)
}

db.getAllUsers = async () => {
    return await db.instance.users.toArray()
}


