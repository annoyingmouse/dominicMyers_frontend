(() => {
  const switchers = document.querySelectorAll("#language_switcher > button");
  switchers.forEach((switcher) => {
    switcher.onclick = () => {
      switchers.forEach((el) => el.classList.remove("active"));
      switcher.classList.add("active");
      if(switcher.hasAttribute("lang")){
        document.documentElement.lang = switcher.getAttribute("lang");
        document.body.dispatchEvent(new CustomEvent('lang-change'));
      }
    }
  })
})()