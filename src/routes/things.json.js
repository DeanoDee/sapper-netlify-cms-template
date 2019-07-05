import fs from 'fs';
let data = [];
let dir = `${process.cwd()}/static/things/`;
let dest = `${process.cwd()}/static/things.json`;

let files = fs.readdirSync(dir);
files.forEach(file => {
   let content = require(`${dir}${file}`);
   content.slug = file.replace('.json','');
   data = [...data, content];
});
let json = JSON.stringify(data);

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
    console.log(json);
	res.end(json);
}