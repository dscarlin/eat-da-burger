// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  displayPage();
  setupEventHandlers();
});

function displayPage() {
  // Send the GET request.
  $.get("/api/burgers/").then(
    function(burgers) {
      renderTemplate(burgers);
    }
  );
}

function renderTemplate(burgers) {
  $("#burgers").empty();
  $("#devoured").empty();

  for (let i = 0; i < burgers.length; i++) {
    let burger = burgers[i];
    if (burger.devoured) {
      let devouredHTML = `<input class="form-control" type="text" placeholder="${burger.id} . ${burger.burger_name}" readonly>`
      $("#devoured").append(devouredHTML);
    } else {
      let burgerHTML = `
          <div class="col-md-9 text-center">
              <pre>${burger.id}. ${burger.burger_name}
              </pre>
          </div>
          <div class="col-md-3 text-center">
              <form class="devour-form button-size">
                  <input input type="hidden" class="burger_id" type="text" value=${burger.id}><br>
                  <button type="submit" class="btn btn-default">Devour it!</button>
              </form>
          </div>`;
      $("#burgers").append(burgerHTML);
    }
  }
}

function setupEventHandlers() {
  $(document).on("submit", ".devour-form", function(event) {
    event.preventDefault();

    var burger_id = $(this).children(".burger_id").val();
    console.log(burger_id);
    $.ajax("/api/burgers/" + burger_id, {
      type: "PUT"
    }).then(function(data) {
      // Rerender the page with the updated list
      displayPage();
    });

  });

  $(document).on("submit", ".create-form", function(event) {
    event.preventDefault();

    var burgerName = $(this).children(".form-control").val();
    console.log(burgerName);
    $.ajax("/api/burgers/", {
      type: "POST",
      data: { burger_name: burgerName }
    }).then(function(data) {
      // Rerender the page with the updated list
      displayPage();
    });

  });
};
