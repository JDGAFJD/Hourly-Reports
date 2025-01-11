document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const form = this;
  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", form.action);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let summaryHtml = `<p>${xhr.responseText}</p><hr>`;
        summaryHtml += "<h5>Your Submitted Data:</h5><ul>";
        for (let [key, value] of formData.entries()) {
          summaryHtml += `<li><strong>${key}:</strong> ${value}</li>`;
        }
        summaryHtml += "</ul><p>Please post the summary in the CS channel.</p>";

        document.getElementById("modalSummary").innerHTML = summaryHtml;

        const reportModal = new bootstrap.Modal(document.getElementById("reportModal"));
        reportModal.show();

        form.reset();
      } else {
        alert("Error: Something went wrong.");
      }
    }
  };

  xhr.send(formData);
});
