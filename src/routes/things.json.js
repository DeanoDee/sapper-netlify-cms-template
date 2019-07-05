import fs from 'fs';
let data = [];
let dir = `${process.cwd()}/static/things/`;
let dest = `${process.cwd()}/static/things.json`;

fs.readdir(dir, (err, files) => {
    return new Promise((resolve, reject) => {
        if (err) reject(err);
        files.forEach(file => {
           let content = require(`${dir}${file}`);
           content.slug = file.replace('.json','');
           data = [...data, content];
        });
        resolve(data);
    }).then(data => {
        fs.writeFileSync(dest,JSON.stringify(data));
    }).catch(error => {
        console.log('Failed to write ${dest} because of ${error.message}');
    });
})