(() => {
  const switchers = document.querySelectorAll("#language_switcher > button");
  const searchInput = document.getElementById("search-input")
  const formOptions = document.querySelectorAll("form option");
  formOptions.forEach((option) => {
    console.log(option.dataset)
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
})()