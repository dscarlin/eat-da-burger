// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  displayPage();
  setupEventHandlers();
});

function displayPage() {
  // Send the GET request.
  $.get("/api/burgers/").then(
    function(burgers) {
      console.log(burgers)
      renderTemplate(burgers);
    }
  );
}

function renderTemplate(burgers) {
  $("#burgers").empty();
  $("#devoured").empty();
  $('#button').empty();

  for (let i = 0; i < burgers.length; i++) {
    let burger = burgers[i];
    if (burger.devoured) {
      let devouredHTML = `<input class="form-control" type="text" placeholder="${burger.id} . ${burger.burger_name}" readonly>`
      $("#devoured").append(devouredHTML);
    } else {
      let burgerHTML = 

      `<input class="form-control undevoured" type="text" value="${burger.id} . ${burger.burger_name}" readonly>`
      
      $("#burgers").append(burgerHTML);
      let devourButtonHTML =  
     `<form class="devour-form button-size">

        <input input type="hidden" class="burger_id" type="text" value=${burger.id}>
        <input input class="customer w100" type="text" >
        <button type="submit" class="btn btn-default buttonBorder w100">Devour it!</button>
      </form>`
      $('#button').append(devourButtonHTML)
    }
  }
}

function setupEventHandlers() {
  $(document).on("submit", ".devour-form", function(event) {
    event.preventDefault();
    var burger_id = $(this).children(".burger_id").val();
    var customer = $(this).children(".customer").val();
    
    console.log(burger_id);
    $.ajax("/api/burgers/" + burger_id, {
      type: "PUT"
    }).then(function(data) {
      console.log(data)
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
