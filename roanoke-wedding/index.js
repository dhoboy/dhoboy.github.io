window.onload = function(e) {
  this.draw(((window.history || {}).state || {}).section || null);
}

function draw(section) {
  // grab the main and content divs
  var main = document.getElementById("main");
  var content = document.getElementById("content");
  
  // remove the existing content div
  content.remove();
  
  // make new empty content div
  content = document.createElement("div");
  content.setAttribute("id", "content");
  
  // draw new section
  switch(section) {
    case 'schedule': 
      this.drawSchedule(main, content);
      break;
    case 'travel':
      this.drawTravel(main, content);
      break;
    case 'stay':
      this.drawStay(main, content);
      break;
    case 'roanoke': 
      this.drawRoanoke(main, content);
      break;
    case 'presents':
      this.drawPresents(main, content);
      break;
    case 'dinnerMenu':
      this.drawDinnerMenu(main, content);
      break;
    case 'tea':
      this.drawTea(main, content);
      break;
    default:
      this.drawSchedule(main, content);
      break;
  }
}

function highlightNavItem(navItemId) {
  Object.values(document.getElementsByClassName("navItem"))
    .forEach(function(item) {
      if (item.id === navItemId) {
        item.setAttribute("style", "font-weight: bold");  
      } else {
        item.setAttribute("style", "font-weight: normal");
      }
    });
}

function drawSchedule(main, content) {
  history.pushState({ section: "schedule" }, "", "#schedule");
  this.highlightNavItem("navSchedule");  
 
  var text = [
    "5pm Arrive",
    "5:30pm Buffet Style Dinner",
    "7pm Toasts",
    "8pm Dancing",
    //"Next Morning: Brunch tbd",
  ];
  
  // draw lines to content div
  text.forEach(function(line) {
    var lineDiv = document.createElement("div");  
    lineDiv.appendChild(document.createTextNode(line));
    content.appendChild(lineDiv);
  });
  
  // draw content div to page
  main.appendChild(content);
}

function drawDinnerMenu(main, content) {
  history.pushState({ section: "dinner" }, "", "#dinner");
  this.highlightNavItem("navDinner");  

  var text = [
    "Buffet Style Dinner will be served"
  ];
  
  // draw lines to content div
  text.forEach(function(line) {
    var lineDiv = document.createElement("div");  
    lineDiv.appendChild(document.createTextNode(line));
    content.appendChild(lineDiv);
  });
  
  // draw content div to page
  main.appendChild(content);

}

function drawTravel(main, content) {
  history.pushState({ section: "travel" }, "", "#travel");
  this.highlightNavItem("navTravel");  

  var text = [
    "Getting to Roanoke"
  ];
  
  // draw lines to content div
  text.forEach(function(line) {
    var lineDiv = document.createElement("div");  
    lineDiv.appendChild(document.createTextNode(line));
    content.appendChild(lineDiv);
  });
  
  // draw content div to page
  main.appendChild(content);
}

function drawStay(main, content) {
  history.pushState({ section: "stay" }, "", "#stay");
  this.highlightNavItem("navStay"); 
   
  var text = [
    "Where to stay in Ronaoke",
  ];
  
  // draw lines to content div
  text.forEach(function(line) {
    var lineDiv = document.createElement("div");  
    lineDiv.appendChild(document.createTextNode(line));
    content.appendChild(lineDiv);
  });
  
  // draw content div to page
  main.appendChild(content);
}

function drawRoanoke(main, content) {
  history.pushState({ section: "roanoke" }, "", "#roanoke");
  this.highlightNavItem("navRoanoke");  

  var text = [
    "Things to do in Roanoke",
    "Roanoke Star",
    "Taubman Museum of art",
    "Transportation Museum",
  ];
  
  // draw lines to content div
  text.forEach(function(line) {
    var lineDiv = document.createElement("div");  
    lineDiv.appendChild(document.createTextNode(line));
    content.appendChild(lineDiv);
  });
  
  // draw content div to page
  main.appendChild(content);
}

function drawPresents(main, content) {
  history.pushState({ section: "presents" }, "", "#presents");
  this.highlightNavItem("navPresents");  

  var text = [
    "Presents appreciated but not necessary",
    "Haruko is currently living in Japan",
    "Daniel is currently living in California",
    "And we're still deciding where we will live together",
    "Gift cards to Costco or Target would be helpful",
    "For us to get things when we finally get a place together."
  ];
  
  // draw lines to content div
  text.forEach(function(line) {
    var lineDiv = document.createElement("div");  
    lineDiv.appendChild(document.createTextNode(line));
    content.appendChild(lineDiv);
  });
  
  // draw content div to page
  main.appendChild(content);
}

function drawTea(main, content) {
  history.pushState({ section: "tea" }, "", "#tea");
  this.highlightNavItem("navTea");  
  
  var text = [
    "Tea will be served at this party",
    "Attending guests will be given a tea cup",
    "Tea will be brewed and served at designated tea table",
    "Tea List:",
    "Hojicha",
    "Ripe Puerh",
  ];
  
  // draw lines to content div
  text.forEach(function(line) {
    var lineDiv = document.createElement("div");  
    lineDiv.appendChild(document.createTextNode(line));
    content.appendChild(lineDiv);
  });
  
  // draw content div to page
  main.appendChild(content);
}


