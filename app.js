'use strict';

const $submitButton = $('#search');
const $removeButton = $('#remove');

$submitButton.submit(getGiphy);

async function getGiphy() {
    let sResult = $('input').val();
    let searchResult = await axios.get('http://api.giphy.com/v1/gifs/search?', { params: { sResult } })
    console.log(searchResult);
}