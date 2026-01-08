(() => {
  const switchers = document.querySelectorAll("#language_switcher > button");
  const searchInput = document.getElementById("search-input")
  if (document.documentElement.lang === "en") {
    searchInput.placeholder = "Search"
  }
  if (document.documentElement.lang === "cy") {
    searchInput.placeholder = "Chwiliwch"
  }
  switchers.forEach((switcher) => {
    switcher.onclick = () => {
      switchers.forEach((el) => el.classList.remove("active"));
      switcher.classList.add("active");
      if(switcher.hasAttribute("lang")){
        document.documentElement.lang = switcher.getAttribute("lang");
        document.body.dispatchEvent(new CustomEvent('lang-change'));
        if(lang === "en"){
          searchInput.placeholder = "Search"
        }
        if(lang === "cy"){
          searchInput.placeholder = "Chwiliwch"
        }
      }
    }
  })
})()