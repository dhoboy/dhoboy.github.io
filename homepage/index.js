var lang = "en"; // support for 'en' and 'jp'
const _main = document.getElementById("main");

// const _photo = document.getElementById("photo");
// const _logo =  document.getElementById("logo");
// const _content = document.getElementById("content");

const setLang = (l) => {
  lang = l;

  // set lang in the browser session cache
  // sessionStorage.setItem("lang", lang);
  
  // set lang class on body
  var body = document.getElementById("body");
  body.className = lang;

  // redraw in the new language
  // this.draw(((window.history || {}).state || {}).section || null);
}

// maybe do some pre-load of all the images thing
window.onload = () => {
  routePage(window.location.href.split("#")?.[1]);
}

window.addEventListener("hashchange", ({ oldURL, newURL }) => {
  if (oldURL !== newURL) routePage(newURL.split("#")?.[1]);
});

const routePage = (section) => {
  switch(section) {
    case "projects":
      drawSection("projects");
      break;
    
    case "keyboards":
      drawSection("keyboards");
      break;
    
    case "tea":
      drawSection("tea");
      break;
    
    case "work":
    default:
      drawSection("work");
      break;
  }
}

// each section's content defined in a json file.
// this is a quick and dirty SPA-style site.
// re-write in React
const drawSection = name => {
  _main.innerHTML = "";
  
  fetch(`/homepage/${name}.json`)
    .then(resp => resp.json())
    .then(({ photo_url, logo_url, logo_link, content_en, content_jp }) => {
      // start each page at the top
      window.scrollTo(0,0);
      
      // set active page in nav
      document.querySelectorAll("#nav a").forEach(item => item.setAttribute("class", ""));
      document.getElementById(name).setAttribute("class", "active");

      const _photo = document.createElement("div");
      _photo.setAttribute("id", "photo");
      
      const _logo =  document.createElement("div");
      _logo.setAttribute("id", "logo");

      const _content = document.createElement("div");
      _content.setAttribute("id", "content");

      // set section name as a class on the main div
      _main.setAttribute("class", name);
      
      // set background image
      if (photo_url) _photo.setAttribute("style", `background:url(/homepage/${photo_url}),#aaa;background-size:cover;background-position:50%;`);
      
      // set logo
      if (logo_url)  _logo.setAttribute("style", `background:url(/homepage/${logo_url});background-size:cover;background-position:50%;cursor:pointer`);
      if (logo_link) _logo.onclick = () => window.open(logo_link);
      
      content_en.forEach(part => {
        const node = _content.appendChild(document.createElement(part.tag));
        if (part.tag === "a") node.setAttribute("href", part.href);
        node.appendChild(document.createTextNode(part.content));
      });

      _main.appendChild(_photo);
      _main.appendChild(_logo);
      _main.appendChild(_content);

    });
}
