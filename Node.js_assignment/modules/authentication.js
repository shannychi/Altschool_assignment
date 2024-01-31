const fs = require("fs")
const path = require("path");
const { resolve } = require("url");

const userPath = path.join(__dirname, "..", "users.json");

function getAllUsers() {
    return new Promise((resolve, reject) => {

        fs.readFile(userPath, "utf8", (err, users) => {
            if (err){
                reject(err)
            }

            resolve(JSON.parse(users))
        })

    })
}


function authenticating(req, res) {
    return new Promise((resolve, reject) => {

        const body = [];

        req.on("data", (chuck) => {
            body.push(chuck)
        })

        req.on("end", async () => {
            const parsedBody = Buffer.concat(body).toString()

            if(!parsedBody) {
                reject("username or password not found")
            }

            const logDetails = JSON.parse(parsedBody);
            const users = await getAllUsers();
            
            const userFound = users.find((user) => {
                return user.username === logDetails.username
            })

            if(!userFound) {
                reject("user not found! please sign up!")
            }

            if(userFound.password !== logDetails.password){
                reject("inavalid username or password")
            }
            resolve()
        })

    })
}


module.exports = {
    authenticating
}
    
