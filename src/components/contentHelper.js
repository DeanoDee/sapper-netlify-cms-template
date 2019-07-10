import fs from 'fs';

/**
 * This requrns a function that will get the contents of a file and add the slug element to it
 */
function buildGetRawDataAndSlug(dir){
    return file => {
        const content = require(`${dir}${file}`);
        content.slug = file.replace('.json','');
        return content;
    }
}

/**
 * This requrns a function that will return only the keys of a file you specify and add the slug element to it
 */
function buildGetFilteredDataAndSlug(dir, filterKeys){
    return file =>{
        const content = require(`${dir}${file}`);
        const formatedContent = filterKeys.reduce((accumulator, key) => {
            if( content.hasOwnProperty(key)) accumulator[key] = content[key];
            return accumulator;
        }, {});
        formatedContent.slug = file.replace('.json','');
        return formatedContent;
    }
}

/**
 * This gets every file in a directory and create an amalgmated JSON with an array of objects
 * it's great for creating list pages
 * requires you to argue in a dir (directory)
 * you can optinally argue an array of keys that you want to include in the lists objects (reducing noise and size)
 */
function createListJSON(dir, filterKeys) {
    const files = fs.readdirSync(dir);
    const getData = filterKeys ? buildGetFilteredDataAndSlug(dir, filterKeys) : buildGetRawDataAndSlug(dir);
    const data = files.map(getData);
    return JSON.stringify(data);
}


export { createListJSON };