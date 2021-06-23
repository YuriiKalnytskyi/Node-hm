const fs = require("fs");
const path = require('path');

const group18 = path.join(__dirname, 'group-18');
const group20 = path.join(__dirname, 'group-20');

fs.mkdir(`${__dirname}/boys`, {recursive: true}, (err) => {
    if (err) {
        console.log('---------- Error ------------');
        console.log(err);
        console.log('---------- Error ------------');
    }
})

fs.mkdir(`${__dirname}/girls`, {recursive: true}, (err) => {
    if (err) {
        console.log('---------- Error ------------');
        console.log(err);
        console.log('---------- Error ------------');
    }
})

function gender(path1) {
    fs.readdir(path1, (err, files) => {
        if (err) {
            console.log('---------- Error ------------');
            console.log(err);
            console.log('---------- Error ------------');
            return
        }

        files.map(file => {

            let genderUser = require(`${path1}/${file}`)

            genderUser.gender === 'male' ?
                fs.rename(path.join(path1, file), path.join(__dirname, 'boys', file), (err) => {
                    if (err) {
                        console.log('---------- Error ------------');
                        console.log(err);
                        console.log('---------- Error ------------');
                    }
                })
                :
                fs.rename(path.join(path1, file), path.join(__dirname, 'girls', file), (err) => {
                    if (err) {
                        console.log('---------- Error ------------');
                        console.log(err);
                        console.log('---------- Error ------------');
                    }
                })
        })
    })
}

gender(group18);
gender(group20);