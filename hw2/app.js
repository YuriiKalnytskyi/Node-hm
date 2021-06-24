const express = require("express");
const expressHbs = require('express-handlebars');
const fs = require("fs");
const path = require('path');

const app = express();

const fail = path.join(__dirname, "users", "users.json");
const b = fs.readFileSync(fail);
const users = JSON.parse(b.toString());
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "static")));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));

app.set("views", path.join(__dirname, 'static'));

app.listen(port, () => {
    console.log(`App listen ${port}`);
})

app.get('/users', (req, res) => {
    res.render('users', {users})
})

app.get('/registration', (req, res) => {
    res.render('Registration')
})

app.get('/login', (req, res) => {
    res.render('Login')
})

app.get('/error_login', (req, res) => {
    res.render('Error_login')
})

app.get('/error_registration', (req, res) => {
    res.render('error_registration')
})

app.get('/content', (req, res) => {
    res.render('content')
})

app.post('/registration', (req, res) => {

    const userNew = req.body;
    const {login} = req.body
    const arr = [];
    const user = users.find(user => (user.login === login));

    if (user) {
        res.render('error_registration')
    }
    if (!user) {
        users.map((user1) => {
            arr.push(user1)
            return user1
        })

        arr.push(userNew)

        const newUsers = JSON.stringify(arr)

        fs.writeFile(fail, newUsers, (err) => {
            console.log(err)
        })
        res.render('users', {users})
    }

})

app.post('/login', (req, res) => {

    const {login, password} = req.body;
    const user = users.find(user => (user.login === login) && (user.password === password));

    if (!user) {
        res.render('Error_login')
    }
    res.render('content')
})

