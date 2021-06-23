const path = require('path');
const fs = require('fs');

const group18 = path.join(__dirname, 'group-18');
const group20 = path.join(__dirname, 'group-20');

function group(path1) {
    fs.readdir(path1, (err, files) => {
        if (err) {
            console.log('---------- Error ------------');
            console.log(err);
            console.log('---------- Error ------------');
            return
        }
        files.map(file => {
            fs.rename(path.join(path1, file), path.join(path1 === group18 ? group20 : group18, file), err1 => {
                if (err1) {
                    console.log('---------- Error ------------');
                    console.log(err1);
                    console.log('---------- Error ------------');
                }
            })
        })
    })
}

group(group18);
group(group20);
