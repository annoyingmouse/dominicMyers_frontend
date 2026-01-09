(() => {
  const html = document.querySelector("html")
  const switchers = document.querySelectorAll("#language_switcher > button");
  const searchInput = document.getElementById("search-input")
  const formOptions = document.querySelectorAll("form option");
  const sizeChanger = document.getElementById("size_changer");
  sizeChanger.addEventListener("click", (e) => {
    if(sizeChanger.dataset.size === "default") {
      sizeChanger.dataset.size = "enlarged"
      html.style.fontSize = "150%"
    } else {
      sizeChanger.dataset.size = "default"
      html.style.fontSize = "100%"
    }
    sizeChanger.querySelectorAll("span").forEach(el => {
      if(sizeChanger.dataset.size === el.dataset.size) {
        el.style.display = "unset"
      } else {
        el.style.display = "none"
      }
    })
  })
  if (document.documentElement.lang === "en") {
    searchInput.placeholder = "Search"
    formOptions.forEach((option) => {
      if(option.dataset.langEn) {
        option.textContent = option.dataset.langEn;
      }
    })
  }
  if (document.documentElement.lang === "cy") {
    searchInput.placeholder = "Chwiliwch"
    formOptions.forEach((option) => {
      if(option.dataset.langCy) {
        option.textContent = option.dataset.langCy;
      }
    })
  }
  switchers.forEach((switcher) => {
    switcher.onclick = () => {
      switchers.forEach((el) => el.classList.remove("active"));
      switcher.classList.add("active");
      if(switcher.hasAttribute("lang")){
        const lang = switcher.getAttribute("lang");
        document.documentElement.lang = lang;
        document.body.dispatchEvent(new CustomEvent('lang-change'));
        if(lang === "en"){
          searchInput.placeholder = "Search"
          formOptions.forEach((option) => {
            if(option.dataset.langEn) {
              option.textContent = option.dataset.langEn;
            }
          })
        }
        if(lang === "cy"){
          searchInput.placeholder = "Chwiliwch"
          formOptions.forEach((option) => {
            if(option.dataset.langCy) {
              option.textContent = option.dataset.langCy;
            }
          })
        }
      }
    }
  })

  // console.log(html)
  // html.style.fontSize = "150%"
  // console.log(html.style.fontSize)

})()