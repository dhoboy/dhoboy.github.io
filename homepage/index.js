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
      drawSection("keyboards", { pageTop: true });
      break;
    
    case "tea":
      drawSection("tea");
      break;

    case "contact": 
      drawSection("contact");
      break;
    
    case "work":
    default:
      drawSection("work");
      break;
  }
}

// each section's content defined in a json file.
// goal was to make a quick and dirty "SPA-style" site.
// will re-write in React. turned out to be dirty and not-so-quick.
// check out my github for better examples of my work.
const drawSection = (name, { pageTop = false } = {}) => {
  _main.innerHTML = "";
  
  fetch(`/homepage/${name}.json`)
    .then(resp => resp.json())
    .then(({ photo_url, bottom_photo_url, logo_url, logo_link, content_en, content_jp }) => {
      // start each page at the top
      window.scrollTo(0,0);
      
      // set active page in nav
      document.querySelectorAll("#nav a").forEach(item => item.setAttribute("class", ""));
      document.getElementById(name).setAttribute("class", "active");

      const _photo = document.createElement("div");
      _photo.setAttribute("id", "photo");

      const _bottom_photo = document.createElement("div");
      _bottom_photo.setAttribute("id", "bottom-photo");
      
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

      if (bottom_photo_url) _bottom_photo.setAttribute("style", `background:url(/homepage/${bottom_photo_url}),#aaa;background-size:cover;background-position:50%;`)

      _main.appendChild(_photo);
      _main.appendChild(_logo);
      _main.appendChild(_content);
      _main.appendChild(_bottom_photo);

      if (pageTop) {
        const _page_top = document.createElement("div");
        _page_top.setAttribute("id", "page-top");
        
        const _page_top_a = document.createElement("a");
        _page_top_a.setAttribute("href", `#${name}`);
        _page_top_a.appendChild(document.createTextNode("Page Top"));
        _page_top_a.onclick = e => {
          e.preventDefault();
          window.scrollTo(0,0);
        };
        
        _page_top.appendChild(_page_top_a);
        _main.appendChild(_page_top);
      }

    });
}
