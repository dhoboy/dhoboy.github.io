lang = "en"; // support for 'en' and 'jp'

function setLang(l) {
  lang = l;

  // set lang in the browser session cache
  sessionStorage.setItem("lang", lang);
  
  // set lang class on body
  var body = document.getElementById("body");
  body.className = lang;

  // redraw in the new language
  this.draw(((window.history || {}).state || {}).section || null);
}

window.onload = function(e) { 
  // lang has already been set in session, use that 
  var sessionLang = sessionStorage.getItem("lang");
  if (sessionLang == "en" || sessionLang === "jp") {
    this.setLang(sessionLang);
  } else {
    // if your browser is set to Japanese, load Japanese lang version 
    if (navigator.language === "ja") {
      this.setLang("jp");
    } else {
      this.setLang("en");
    }
  }
}

function draw(section) {
  // bold the lang option being used
  var languageOptions = document.getElementsByClassName("languageOption");
  var fullLangToAbbr = { "English": "en", "日本語": "jp" };
  for (var i = 0; i < languageOptions.length; i++) {
    var optionTag = languageOptions[i];
    if (fullLangToAbbr[optionTag.innerHTML] === lang) {
      optionTag.style.fontWeight = "bold";
    } else {
      optionTag.style.fontWeight = "normal";
    }
  };

  // draw the header and nav
  this.drawHeader();
  this.drawNav();

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

function drawHeader() {
  // Title
  var titleText = {
    "en": "Haruko and Daniel",
    "jp": "晴子とダニエル"
  }

  var title = document.getElementById("title");
  title.textContent = titleText[lang];

  // Subtitle
  var subtitleText = {
    "en": "Marriage Celebration 🎉",
    "jp": "結婚パーティーのお知らせ 🎉"
  };

  var subtitle = document.getElementById("subtitle");
  subtitle.textContent = subtitleText[lang];

  // Day of Week
  var dayOfWeekText = {
    "en": "Saturday Evening",
    "jp": "土曜日の夜"
  };

  var dayOfWeek = document.getElementById("dayOfWeek");
  dayOfWeek.textContent = dayOfWeekText[lang];

  // Day of Year
  var dayOfYearText = {
    "en": "November 23, 2019",
    "jp": "2019年11月23日"
  };

  var dayOfYear = document.getElementById("dayOfYear");
  dayOfYear.textContent = dayOfYearText[lang];

  // Venue Anchor
  var venueAnchorText = {
    "en": "The Maridor",
    "jp": "The Maridor （会場名）"
  };

  var venueAnchor = document.getElementById("venueAnchor");
  venueAnchor.textContent = venueAnchorText[lang];

  // Venue Address
  var venueAddressText = {
    "en": "1857 Grandin Road",
    "jp": "1857 Grandin Road（住所）"
  };

  var venueAddress = document.getElementById("venueAddress");
  venueAddress.textContent = venueAddressText[lang];

  // Venue City
  var venueCityText = {
    "en": "Roanoke, Virginia, 24015",
    "jp": "ロノーク、バージニア州, 24015"
  };

  var venueCity = document.getElementById("venueCity");
  venueCity.textContent = venueCityText[lang];  

}

function drawNav() {
  var navText = {
    navSchedule: {
      "en": "Schedule",
      "jp": "日程"
    },
    navTravel: {
      "en": "Travel",
      "jp": "旅行について"
    },
    navStay: {
      "en": "Stay",
      "jp": "滞在について"
    },
    navRoanoke: {
      "en": "Roanoke",
      "jp": "ロノーク"
    },
    navPresents: {
      "en": "Presents",
      "jp": "プレゼント"
    },
    navDinner: {
      "en": "Dinner",
      "jp": "夕食"
    },
    navTea: {
      "en": "Tea",
      "jp": "お茶"
    },
  };

  var navItems = document.getElementsByClassName("navItem");

  for (var i = 0; i < navItems.length; i++) {
    var item = navItems[i];
    item.textContent = navText[item.id][lang];
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
 
  var text = {
    "en": [
      { time: "5 pm", activity: "Arrive" },
      { time: "5:30 pm", activity: "Buffet Style Dinner" },
      { time: "7 pm", activity: "Toasts" },
      { time: "8 pm", activity: "Dancing" },
      { time: "9-10 pm", activity: "End of Party" },
      //"Next Morning: Brunch tbd",
    ],
    "jp": [ 
      { time: "5時", activity: "集合" },
      { time: "5時半", activity: "ビュッフェ形式の夕食（テーブル席）" },
      { time: "7時", activity: "乾杯" },
      { time: "8時", activity: "ダンス" },
      { time: "9時〜10時", activity: "頃 終了" },
    ]
  };

  var scheduleDiv = document.createElement("div");
  scheduleDiv.setAttribute("id", "schedule");
  
  // draw lines to content div
  text[lang].forEach(function(line) {
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

  var text = {
    "en": [
      "Buffet style Dinner will be served",
      "Fish and Chicken Entrees will be available",
      "When Dinner menu is finalized it will be posted here!",
      "We will have cake for dessert",
      "Wine and Beer will be available",
      "There will be no liquor, coffee, or champagne",
      "Tea will be available!",
      "See the Tea tab for more information"
    ], 
    "jp": [
      "ビュッフェ形式の夕食が出ます。",
      "魚、チキン、などのメイン料理もあります。",
      "夕食のメニューが決まったらこのページでお知らせします。",
      "デザートにはケーキが出ます。",
      "ワインとビールもあります。",
      "リキュール、コーヒー、シャンパンはありません。",
      "お茶はた〜〜くさん用意します。",
      "お茶の情報については別ページ（お茶のページ）をご覧ください。"
    ]
  };

  var dinnerDiv = document.createElement("div");
  dinnerDiv.setAttribute("id", "dinner");
  
  // draw lines to content div
  text[lang].forEach(function(line, i) {
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

  var text = {
    "en": [
      "Getting to Roanoke advice:",
      "I have been flying in straight to Roanoke Regional Airport (ROA) recently.",
      "The prices are competitive with DC, Charlottesville, and Richmond airports, and you don't have to make a multi-hour drive when you land.",
      "If you are driving on I81, there is a scenic route that runs parallel to it called Route 11. Its a nice road to get on and off of to take a break from I81 or drive around an I81 traffic jam."
    ],
    "jp": [
      "ロノークへの行き方：",
      "ロノーク空港へ直接来るのをオススメします。",
      "ロノーク空港までの飛行機代はワシントンDC行き、シャーロッツビル行き、リッチモンド行きと比べてそんなに変わりません。",
    ]
  };

  var travelDiv = document.createElement("div");
  travelDiv.setAttribute("id", "travel");  
  
  // draw lines to content div
  text[lang].forEach(function(line) {
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
   
  var text = {
    "en": [
      { text: "Where to stay in Roanoke ?" },
      { text: "We recommend these hotels:" },
      { link: "http://www.hotelroanoke.com/", 
        text: "Hotel Roanoke",
        blurb: ": Roanoke's landmark hotel. Best for people who want the nicest experience Roanoke has to offer." },
      { link: "https://www.marriott.com/hotels/travel/roash-springhill-suites-roanoke/", 
        text: "SpringHill Suites by Marriott",
        blurb: ": New, upscale hotel. Best for people with car access who want a nice place to stay." },
      { link: "https://www.holidayinn.com/hotels/us/en/roanoke/roatw/hoteldetail/", 
        text: "Holiday Inn: Tanglewood",
        blurb: ": Holiday Inn with new beds. Across the street from Waffle House open 24 hours, and Szechuan Restaurant: the best Chinese food in Roanoke. Meals available for purchase in the hotel restuarant. Best for people without car access who may be experiencing jetlag and need food in the middle of the night." },
      { link: "https://www.choicehotels.com/virginia/roanoke/sleep-inn-hotels/", 
        text: "Sleep Inn: Tanglewood",
        blurb: ": Affordable. On the same side of the street as Waffle House open 24 hours, and Szechuan Restaurant: the best Chinese food in Roanoke. Contintental breakfast included. Best for people without car access who may be experiencing jetlag and need food in the middle of the night." },
      { link: "https://www.choicehotels.com/virginia/roanoke/quality-inn-hotels/va207", 
        text: "Quality Inn: Tanglewood",
        blurb: ": Compare with the Sleep Inn to find most affordable hotel we recommend in Roanoke. Bit too far to walk to anything. Continental breakfast included." }
    ],
    "jp": [
      { text: "泊まれる場所" },
      { text: "オススメのホテル：" },
      { link: "http://www.hotelroanoke.com/", text: "ホテルロノーク（高い）" },
      { link: "https://www.marriott.com/hotels/travel/roash-springhill-suites-roanoke/", text: "スプリングヒルスイーツ" },
      { link: "https://www.holidayinn.com/hotels/us/en/roanoke/roatw/hoteldetail/", 
        text: "ホリデーイン: タングルード",},
        //blurb: ": Holiday Inn with new beds. Across the street from Waffle House open 24 hours, and Szechuan Restaurant: the best Chinese food in Roanoke. Meals available for purchase in the hotel restuarant. Best for people without car access who may be experiencing jetlag and need food in the middle of the night." },
      { link: "https://www.choicehotels.com/virginia/roanoke/sleep-inn-hotels/", 
        text: "スリプ イン: タングルード",},
        //blurb: ": Affordable. On the same side of the street as Waffle House open 24 hours, and Szechuan Restaurant: the best Chinese food in Roanoke. Contintental breakfast included. Best for people without car access who may be experiencing jetlag and need food in the middle of the night." },
      { link: "https://www.choicehotels.com/virginia/roanoke/quality-inn-hotels/va207", 
        text: "クラリテｲー イン: タングルード",},
        //blurb: ": Compare with the Sleep Inn to find most affordable hotel we recommend in Roanoke. Bit too far to walk to anything. Continental breakfast included." }
    ]
  };

  var stayDiv = document.createElement("div");
  stayDiv.setAttribute("id", "stay");
  
  // draw lines to content div
  text[lang].forEach(function(line) {
    var lineDiv = document.createElement("div");  
    
    if (line.link) {
      var anchor = document.createElement("a");
      anchor.setAttribute("href", line.link);
      anchor.setAttribute("target", "_blank");
      anchor.appendChild(document.createTextNode(line.text));
      lineDiv.appendChild(anchor);
      if (line.blurb) { // Japanese lang. site no blurbs 
        var blurb = document.createTextNode(line.blurb);
        lineDiv.appendChild(blurb);
      }
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

  var text = {
    "en": [
      { text: "Have some extra time in Roanoke?" },
      { text: "Check these things out: " },
      { link: "https://www.visitroanokeva.com/things-to-do/attractions/roanoke-star/", 
        text: "Roanoke Star" },
      { link: "https://www.taubmanmuseum.org/art/current-exhibitions", 
        text: "Taubman Museum of Art" },
      { link: "http://www.vmt.org/", 
        text: "Virginia Museum of Transportation" },
    ],
    "jp": [
      { text: "ロノークでの過ごし方" },
      { text: "観光地：" },
      { link: "https://www.visitroanokeva.com/things-to-do/attractions/roanoke-star/", 
        text: "ロノークスター" },
      { link: "https://www.taubmanmuseum.org/art/current-exhibitions", 
        text: "美術館" },
      { link: "http://www.vmt.org/", 
        text: "交通博物館" },
    ]
  };
    
  var roanokeDiv = document.createElement("div");
  roanokeDiv.setAttribute("id", "roanoke");
  
  // draw lines to content div
  text[lang].forEach(function(line) {
    var lineDiv = document.createElement("div");  
    
    if (line.link) {
      var anchor = document.createElement("a");
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

  var text = {
    "en": [
      "Presents appreciated but not necessary!",
      "Haruko is currently living in Japan",
      "Daniel is currently living in California",
      "We are still deciding where we will live together!",
      "Gift cards to Costco, Target, or the like would be helpful for us to get things when we finally get our place together!"
    ],
    "jp": [
      "必要ないです（荷物になる）",
      "晴子は日本に住んでいるし",
      "ダニエルはカリフォルニア（バージニアから飛行機で7時間）に住んでいて",
      "まだ2人でどこに住むのか分からない状態です！",
    ]
  };

  var presentsDiv = document.createElement("div");
  presentsDiv.setAttribute("id", "presents");
  
  // draw lines to presentsDiv div
  text[lang].forEach(function(line) {
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
  
  var text = {
    "en": [
      { text: "Tea will be served at this party!" },
      { link: "https://www.dailyprogress.com/entertainment/pottery-maker-embraces-the-unforeseen/article_49fbe3b0-d4c9-11e5-b41a-87511128c021.html", 
        text: "Potter Ken_Nagakui is making tea cups for this party!" },
      { text: "Tea will be served at a designated tea table" },
      { text: "Current Tea List: Hojicha, Black Tea, Ripe Puerh" }
    ],
    "jp": [
      { text: "パーティーではお茶が飲めます。" },
      { link: "https://www.dailyprogress.com/entertainment/pottery-maker-embraces-the-unforeseen/article_49fbe3b0-d4c9-11e5-b41a-87511128c021.html", 
        text: ["シャーロッツビルで活躍中の陶芸家、", "永久井 健氏", "によるお茶碗でお茶をお楽しみください！" ]
      },
      { text: "お茶は、お茶テーブルでご賞味いただけます。" },
      { text: "ほうじ茶、紅茶、プーアル茶を用意する予定です。" }
    ]
  };

  var teaDiv = document.createElement("div");
  teaDiv.setAttribute("id", "tea");
  
  // draw lines to tea div
  text[lang].forEach(function(line) {
    var lineDiv = document.createElement("div");  
    
    if (line.link) {  
      var anchor = document.createElement("a");
      anchor.setAttribute("href", line.link);
      anchor.setAttribute("target", "_blank");

      var lineParts = lang === "en" ? line.text.split(" ") : line.text; 
      lineParts.forEach(function(part) {        
        if (part === "Ken_Nagakui" || part === "永久井 健氏") { // setting the anchor text
	        anchor.appendChild(document.createTextNode(part));
          var partSpan = document.createElement("span");
          partSpan.appendChild(anchor);
          part === "永久井 健氏" ? partSpan.style.marginLeft = "-5px" : "";
          lineDiv.appendChild(partSpan);
        } else { // other words in the line
          var partSpan = document.createElement("span");
          partSpan.appendChild(document.createTextNode(part));
          lineDiv.appendChild(partSpan);
        }
      });      
    } else {
      lineDiv.appendChild(document.createTextNode(line.text));
    }

    teaDiv.appendChild(lineDiv);
  });
  
  // draw tea div to content
  content.appendChild(teaDiv);
  
  // draw content div to page
  main.appendChild(content);
}


