// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  displayPage();
  setupEventHandlers();
});

function displayPage() {
  // Send the GET request.
  $.get("/api/burgers/").then(
    function(burgers) {
      console.log("burgers table data array: " + JSON.stringify(burgers, null, 2));
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
      console.log('devoured burger from burger table with joined customer table info: '+ JSON.stringify(burger,null,2))
      let devouredHTML = `<div class="form-control devoured">${burger.id} . ${burger.burger_name}  <p><small>devoured by: ${burger.Customer.customer_name}<small><p><div>`
      $("#devoured").append(devouredHTML);
    } else {
      let burgerHTML = 
      `<div class="row">
        <div class="col-md-6">
          <div class="form-control ht100 undevoured" >${burger.id} . ${burger.burger_name}</div>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-4">
          <form class="devour-form button-size">
            <input input type="hidden" class="burger_id" type="text" value=${burger.id}>
            <input input class="customer w100" type="text" placeholder="Customer Name">
            <button type="submit" class="btn btn-primary buttonBorder w100">Devour it!</button>
          </form>
        </div>
        <div class="col-md-1"></div>
      </div>`
      $("#burgers").append(burgerHTML);

      
    }
  }
}

function setupEventHandlers() {
  $(document).on("submit", ".devour-form", function(event) {
    event.preventDefault();
    var burger_id = $(this).children(".burger_id").val();
    var customer = $(this).children(".customer").val();
    $.ajax("/api/customers/",{
      type: "POST",
      data: { customer_name: customer}
    }).then(response => {
      console.log("created customer that will be linked to foreignKey from burgers table"+JSON.stringify(response, null, 2));
      let id = response.id
      $.ajax("/api/burgers/" + burger_id,{
        type: "PUT",
        data: {Customer: id}
      }).then(function(data) {
        console.log("Database Update Status: " + data)
        // Rerender the page with the updated list
        displayPage();
      });
    })
  });

  $(document).on("submit", ".create-form", function(event) {
    event.preventDefault();

    var burgerName = $(this).children(".form-control").val();
    $.ajax("/api/burgers/", {
      type: "POST",
      data: { burger_name: burgerName }
    }).then(function(data) {
      console.log("Item inserted into burgers table: " + JSON.stringify(data, null, 2));
      // Rerender the page with the updated list
      displayPage();
    });
  });
};
