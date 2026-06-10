(function () {
  var dateElements = document.querySelectorAll("[data-last-updated]");

  if (!dateElements.length) {
    return;
  }

  fetch("https://api.github.com/repos/shagnikmukherjea/oral-remarks-archive")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Unable to load GitHub repository metadata.");
      }

      return response.json();
    })
    .then(function (repository) {
      var pushedAt = repository && repository.pushed_at;

      if (!pushedAt) {
        return;
      }

      var pushedDate = new Date(pushedAt);

      if (Number.isNaN(pushedDate.getTime())) {
        return;
      }

      var formattedDate = pushedDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });

      dateElements.forEach(function (element) {
        element.textContent = formattedDate;
        element.dateTime = pushedDate.toISOString().slice(0, 10);
      });
    })
    .catch(function () {
      return;
    });
})();
