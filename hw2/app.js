const express = require("express");
const expressHbs = require('express-handlebars');
const fs = require("fs");
const path = require('path');

const app = express();

const fail = path.join(__dirname, "users", "users.json");
const port = 3000;

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
});

app.get('/users', (req, res) => {
    const users  =getUser();
    res.render('users', {users});
});

app.get('/users/:userId', (req, res) => {
    const {userId}=req.params;
    const users = getUser();
    const user = users.find((value => value.userId ===+userId));
    res.render('user', {user});
});

app.get('/registration', (req, res) => {
    res.render('registration');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/error', (req, res) => {
    res.render('error');
});

app.get('/content', (req, res) => {
    res.render('content');
});

app.post('/registration', (req, res) => {
    const users = getUser();
    const { name,lastname ,  age, login  ,password} = req.body;
    const arr = [];
    const user = users.find(user => (user.login === login));

    if (user) {
        res.render('error' ,{error:'This login already exists'});
    }
    if (!user) {
        users.map((user1) => {
            arr.push(user1);
            return user1
        });
        // arr.push(userNew );
        arr.push({name , lastname , age , login  ,password , userId:Date.now()})

        const newUsers = JSON.stringify(arr);

        fs.writeFile(fail, newUsers, (err) => {
            console.log(err);
        });
        res.redirect("/login");
    }
});

app.post('/login', (req, res) => {
    const users = getUser();
    const {login, password} = req.body;
    const user = users.find(user => (user.login === login) && (user.password === password));

    if (!user) {
        res.render('error' ,{error:"login or password is not correct, try again"});
        return ;
    }

    res.redirect(`/user/${user.userId}`);
});

function getUser(){
    return JSON.parse(fs.readFileSync(fail).toString());
}

