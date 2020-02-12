const username =  "docker"
const password = "passphrase"
const database = "example"

db.createUser({
    user: username,
    pwd: password,
    roles: [
        {
            role: "readWrite",
            db: database
        }
    ]
})