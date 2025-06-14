async function searchMovies() {
  const searchQuery = document.getElementById("movieSearchInput").value.trim();

  if (!searchQuery) {
    alert("Please enter a movie title.");
    return;
  }

  const fastSearchResults = document.querySelector(".fast__search--results");
  fastSearchResults.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `https://omdbapi.com/?apikey=74e09e59&s=${encodeURIComponent(
        searchQuery
      )}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }

    const data = await response.json();

    if (data.Response === "True") {
      renderFastSearchResults(data.Search);
    } else {
      showError("No results found");
    }
  } catch (error) {
    showError("An error occurred while fetching data");
    console.error(error);
  }
}

function renderFastSearchResults(searchResults) {
  const fastSearchResults = document.querySelector(".fast__search--results");
  fastSearchResults.innerHTML = "";

  const fastSearchResultsHTML = searchResults
    .map((fast) => {
      const poster = fast.Poster !== "N/A" ? fast.Poster : "fallback-image-url";
      return `
        <div class="fast__search--result">
          <figure class="fast__search--img--wrapper">
            <img class="fast__search--img" src="${poster}" alt="${fast.Title}">
          </figure>
          <div class="fast__search--title">${fast.Title}</div>
          <div class="fast__search--year">${fast.Year}</div>
        </div>`;
    })
    .join("");

  fastSearchResults.innerHTML = fastSearchResultsHTML;
}

function showError(message) {
  const fastSearchResults = document.querySelector(".fast__search--results");
  fastSearchResults.innerHTML = `<p>${message}</p>`;
}
