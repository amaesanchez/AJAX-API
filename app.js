"use strict";

const baseURL = "http://api.giphy.com/v1/gifs/search"
const APIKey = "RjDukV642qX8mGf72Qt7SwTLhJ4pi4fQ";
const gifArrLength = 50;

/**  */
async function searchGiphy(evt) {
  evt.preventDefault();
  let searchResult = $("#input").val();

  const response = await axios.get(baseURL, {
    params: { q: searchResult, api_key: APIKey },
  });
  let gifList = response.data.data
  let gifData = randomImg(gifList);
  addGiphy(gifData);
}


/**  */
function randomImg(imgArr) {
  return imgArr[Math.floor(Math.random() * gifArrLength)];
}

function addGiphy(img) {
  let gifURL = img.images.downsized.url;

  let $gifImg = $("<img>").attr("src", gifURL);

  $("#img-container").append($gifImg);
}

// submit buttons default behavior is to refresh page, must add
// preventdefault to ftn

$("#search").on("click", searchGiphy);

$("#remove").on("click", function (evt) {
  $("#img-container").empty();
});
