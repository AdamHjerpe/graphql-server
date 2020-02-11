db.createUser({
    user: process.env.MONGO_USER,
    pwd: process.env.MONGO_PWD,
    roles: [
        {
            role: "readWrite",
            db: process.env.MONGO_DB
        }
    ]
})
console.log(`This is the init user: ${process.env.MONGO_USER}`)