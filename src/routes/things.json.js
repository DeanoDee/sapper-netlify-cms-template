import { createListJSON } from '../components/contentHelper';

//The directory where you are publishing content to with the Netlify CMS
const dir = `${process.cwd()}/static/things/`;
//I just want to limit this list to the auto generated slug and just the title to keep my list slim and trim
const filterKeys = ['title'];
//Here I call the helper function and write the response down below when it's requsted. When the project is exported this list will be created, thusly whenever the Netlify CMS forces a rebuild it will rebuild this file
const json = createListJSON(dir, filterKeys);

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	res.end(json);
}