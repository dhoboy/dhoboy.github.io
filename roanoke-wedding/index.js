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
    case 'dinner':
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
    { time: "5 pm", activity: "Arrive" },
    { time: "5:30 pm", activity: "Buffet Style Dinner" },
    { time: "7 pm", activity: "Toasts" },
    { time: "8 pm", activity: "Dancing" },
    { time: "9-10 pm", activity: "End of Party" },
    //"Next Morning: Brunch tbd",
  ];

  var scheduleDiv = document.createElement("div");
  scheduleDiv.setAttribute("id", "schedule");
  
  // draw lines to content div
  text.forEach(function(line) {
    var lineDiv = document.createElement("div");  
    
    var timeSpan = document.createElement("span");
    timeSpan.setAttribute("class", "time");
    timeSpan.appendChild(document.createTextNode(line.time));
    
    var activitySpan = document.createElement("span");
    activitySpan.setAttribute("class", "activity");
    activitySpan.appendChild(document.createTextNode(line.activity)); 

    lineDiv.appendChild(timeSpan);
    lineDiv.appendChild(activitySpan);
    
    scheduleDiv.appendChild(lineDiv);
  });
  
  // draw schedule div to content
  content.appendChild(scheduleDiv);  
 
  // draw content div to page
  main.appendChild(content);
}

function drawDinnerMenu(main, content) {
  history.pushState({ section: "dinner" }, "", "#dinner");
  this.highlightNavItem("navDinner");  

  var text = [
    "Buffet style Dinner will be served",
    "Fish and Chicken Entrees will be available",
    "When Dinner menu is finalized it will be posted here!",
    "We will have cake for dessert",
    "Wine and Beer will be available",
    "There will be no liquor, coffee, or champagne",
    "Tea will be available!",
    "See the Tea tab for more information"
  ];

  var dinnerDiv = document.createElement("div");
  dinnerDiv.setAttribute("id", "dinner");
  
  // draw lines to content div
  text.forEach(function(line, i) {
    var lineDiv = document.createElement("div");  
    lineDiv.appendChild(document.createTextNode(line));
    if (i === text.length - 2) { // penultimate line
      lineDiv.setAttribute("class", "teaLine");
    }
    dinnerDiv.appendChild(lineDiv);
  });

  // draw dinnerDiv to content  
  content.appendChild(dinnerDiv);  

  // draw content div to page
  main.appendChild(content);

}

function drawTravel(main, content) {
  history.pushState({ section: "travel" }, "", "#travel");
  this.highlightNavItem("navTravel");  

  var text = [
    "Getting to Roanoke advice:",
    "I have been flying in straight to Roanoke Regional Airport (ROA) recently.",
    "The prices are competitive with DC, Charlottesville, and Richmond airports, and you don't have to make a multi-hour drive when you land.",
    "If you are driving on I81, there is a scenic route that runs parallel to it called Route 11. Its a nice road to get on and off of to take a break from I81 or drive around an I81 traffic jam."
  ];

  var travelDiv = document.createElement("div");
  travelDiv.setAttribute("id", "travel");  
  
  // draw lines to content div
  text.forEach(function(line) {
    var lineDiv = document.createElement("div");  
    lineDiv.appendChild(document.createTextNode(line));
    travelDiv.appendChild(lineDiv);
  });
  
  // draw travel div to content  
  content.appendChild(travelDiv);  

  // draw content div to page
  main.appendChild(content);
}

function drawStay(main, content) {
  history.pushState({ section: "stay" }, "", "#stay");
  this.highlightNavItem("navStay"); 
   
  var text = [
    { text: "Where to stay in Roanoke ?" },
    { text: "We recommend these hotels:" },
    { link: "http://www.hotelroanoke.com/", text: "Hotel Roanoke" },
    { link: "https://www.marriott.com/hotels/travel/roash-springhill-suites-roanoke/", text: "SpringHill Suites by Marriott" },
  ];

  var stayDiv = document.createElement("div");
  stayDiv.setAttribute("id", "stay");
  
  // draw lines to content div
  text.forEach(function(line) {
    var lineDiv = document.createElement("div");  
    
    if (line.link) {
      let anchor = document.createElement("a");
      anchor.setAttribute("href", line.link);
      anchor.setAttribute("target", "_blank");
      anchor.appendChild(document.createTextNode(line.text));
      lineDiv.appendChild(anchor);
    } else {
      lineDiv.appendChild(document.createTextNode(line.text));
    }
    
    stayDiv.appendChild(lineDiv);
  });
  
  // draw stayDiv to content
  content.appendChild(stayDiv);
  
  // draw content div to page
  main.appendChild(content);
}

function drawRoanoke(main, content) {
  history.pushState({ section: "roanoke" }, "", "#roanoke");
  this.highlightNavItem("navRoanoke");  

  var text = [
    { text: "Have some extra time in Roanoke?" },
    { text: "Check these things out: " },
    { link: "https://www.visitroanokeva.com/things-to-do/attractions/roanoke-star/", 
     text: "Roanoke Star" },
    { link: "https://www.taubmanmuseum.org/art/current-exhibitions", 
      text: "Taubman Museum of Art" },
    { link: "http://www.vmt.org/", 
      text: "Virginia Museum of Transportation" },
  ];

  var roanokeDiv = document.createElement("div");
  roanokeDiv.setAttribute("id", "roanoke");
  
  // draw lines to content div
  text.forEach(function(line) {
    var lineDiv = document.createElement("div");  
    
    if (line.link) {
      let anchor = document.createElement("a");
      anchor.setAttribute("href", line.link);
      anchor.setAttribute("target", "_blank");
      anchor.appendChild(document.createTextNode(line.text));
      lineDiv.appendChild(anchor);
    } else {
      lineDiv.appendChild(document.createTextNode(line.text));
    }
    
    roanokeDiv.appendChild(lineDiv);
  });
  
  // draw roanoke div to content
  content.appendChild(roanokeDiv);

  // draw content div to page
  main.appendChild(content);
}

function drawPresents(main, content) {
  history.pushState({ section: "presents" }, "", "#presents");
  this.highlightNavItem("navPresents");  

  var text = [
    "Presents appreciated but not necessary!",
    "Haruko is currently living in Japan",
    "Daniel is currently living in California",
    "We are still deciding where we will live together!",
    "Gift cards to Costco, Target, or the like would be helpful for us to get things when we finally get our place together!"
  ];

  var presentsDiv = document.createElement("div");
  presentsDiv.setAttribute("id", "presents");
  
  // draw lines to presentsDiv div
  text.forEach(function(line) {
    var lineDiv = document.createElement("div");  
    lineDiv.appendChild(document.createTextNode(line));
    presentsDiv.appendChild(lineDiv);
  });
  
  // draw presentsDiv to content
  content.appendChild(presentsDiv);  

  // draw content div to page
  main.appendChild(content);
}

function drawTea(main, content) {
  history.pushState({ section: "tea" }, "", "#tea");
  this.highlightNavItem("navTea");  
  
  var text = [
    "Tea will be served at this party!",
    "Each guest will be given a tea cup",
    "Tea will be served at a designated tea table",
    "Current Tea List: Hojicha, Ripe Puerh"
  ];

  var teaDiv = document.createElement("div");
  teaDiv.setAttribute("id", "tea");
  
  // draw lines to tea div
  text.forEach(function(line) {
    var lineDiv = document.createElement("div");  
    lineDiv.appendChild(document.createTextNode(line));
    teaDiv.appendChild(lineDiv);
  });
  
  // draw tea div to content
  content.appendChild(teaDiv);
  
  // draw content div to page
  main.appendChild(content);
}


