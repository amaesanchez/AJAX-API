"use strict";

const BASE_URL = "http://api.giphy.com/";
const API_KEY = "RjDukV642qX8mGf72Qt7SwTLhJ4pi4fQ";
const GIF_LIST_LENGTH = 50;

/** makes get request for giphy URL with user input as
 * query string
 */

async function getGiphy() {
  const searchResult = $("#input").val();

  const response = await axios.get(`${BASE_URL}v1/gifs/search`, {
    params: { q: searchResult, api_key: API_KEY },
  });

  return response.data.data;
}

/** gets random gif object from gif array inside the GET object */
function randomImg(gifList) {
  return gifList[Math.floor(Math.random() * GIF_LIST_LENGTH)];
}

/** appends image with gif url to the image container div in body */
function addGiphy(gif) {
  const gifURL = gif.images.original.url;
  const $gifImg = $("<img>", {src: gifURL}); // easier way to add attr

  $("#img-container").append($gifImg);
}

/** removes all images in image container div */
function removeImgs() {
  $("#img-container").empty();
}

/** CONSTRUCTOR function:
 * revents refresh bc submit button default behavior is
 * to refresh page
 *
 * on form submit, invokes getGiphy, randomImg, and addGiphy to append
 * randomized img to DOM based on user input
 */

async function handleSubmit(evt) {
  evt.preventDefault();
  const gifList = await getGiphy();
  const gifData = randomImg(gifList);
  addGiphy(gifData);
}

/** event listener for submit button */
$("#search").on("click", handleSubmit);

/** event listener for removing all images */
$("#remove").on("click", remove);

// submit buttons default behavior is to refresh page, must add
// preventdefault to ftn
