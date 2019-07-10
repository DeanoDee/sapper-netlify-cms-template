import { getRawJSON } from '../../components/contentHelper';

export function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;
	//The directory where you are publishing content to with the Netlify CMS
	const dir = `${process.cwd()}/src/content/`;
	//This function will get the JSON from the publishing directory, it seemed to be more reliable than just using the static directory.
	const json = getRawJSON(dir, slug);

	if (json) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(json);
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
