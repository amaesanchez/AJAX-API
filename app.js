"use strict";

const baseURL = "http://api.giphy.com/v1/gifs/search";
const APIKey = "RjDukV642qX8mGf72Qt7SwTLhJ4pi4fQ";
const gifListLength = 50;

/** makes get request for giphy URL with user input as
 * query string
 */

async function searchGiphy() {
  let searchResult = $("#input").val();

  const response = await axios.get(baseURL, {
    params: { q: searchResult, api_key: APIKey },
  });

  return response.data.data;
}

/** gets random gif object from gif array inside the GET object */
function randomImg(gifList) {
  return gifList[Math.floor(Math.random() * gifListLength)];
}

/** appends image with gif url to the image container div in body */
function addGiphy(gif) {
  const gifURL = gif.images.downsized.url;
  const $gifImg = $("<img>").attr("src", gifURL);

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
 * invokes searchGiphy, randomImg, and addGiphy to append randomized img
 * to DOM based on user input
 */

async function displayGiphy(evt) {
  evt.preventDefault();
  let gifList = await searchGiphy();
  let gifData = randomImg(gifList);
  addGiphy(gifData);
}

/** event listener for submit button */
$("#search").on("click", displayGiphy);

/** event listener for removing all images */
$("#remove").on("click", remove);

// submit buttons default behavior is to refresh page, must add
// preventdefault to ftn
