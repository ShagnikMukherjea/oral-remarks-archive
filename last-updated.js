(function () {
  var dateElements = document.querySelectorAll("[data-last-updated]");

  if (!dateElements.length || !document.lastModified) {
    return;
  }

  var modifiedDate = new Date(document.lastModified);

  if (Number.isNaN(modifiedDate.getTime())) {
    return;
  }

  var formattedDate = modifiedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  dateElements.forEach(function (element) {
    element.textContent = formattedDate;
    element.dateTime = modifiedDate.toISOString().slice(0, 10);
  });
})();
