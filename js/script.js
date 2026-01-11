(() => {
  const html = document.documentElement;
  const switchers = document.querySelectorAll("#language_switcher > button");
  const inputs = document.querySelectorAll("input");
  const formOptions = document.querySelectorAll("form option");
  const sizeChanger = document.getElementById("size_changer");
  const titleElement = document.getElementsByTagName("title")[0];

  const updateLanguage = (lang) => {
    const langKey = lang.charAt(0).toUpperCase() + lang.slice(1); // 'en' -> 'En', 'cy' -> 'Cy'

    // Update Placeholders
    inputs.forEach((input) => {
      const placeholderText = input.dataset[`placeholderLang${langKey}`];
      if (placeholderText) input.placeholder = placeholderText;
    });

    // Update Form Options via dataset (e.g., langEn or langCy)
    formOptions.forEach((option) => {
      const text = option.dataset[`lang${langKey}`];
      if (text) option.textContent = text;
    });

    // Update Document Title
    const titleText = titleElement.dataset[`lang${langKey}`];
    if (titleText) document.title = titleText;
  };

  sizeChanger.addEventListener("click", () => {
    const isDefault = sizeChanger.dataset.size === "default";
    const newSize = isDefault ? "enlarged" : "default";

    sizeChanger.dataset.size = newSize;
    html.style.fontSize = isDefault ? "150%" : "100%";

    sizeChanger.querySelectorAll("span").forEach((el) => {
      el.style.display = el.dataset.size === newSize ? "unset" : "none";
    });
  });

  switchers.forEach((switcher) => {
    switcher.onclick = () => {
      const lang = switcher.getAttribute("lang");
      if (!lang) return;

      switchers.forEach((el) => el.classList.remove("active"));
      switcher.classList.add("active");

      html.lang = lang;
      updateLanguage(lang);
      document.body.dispatchEvent(new CustomEvent("lang-change"));
    };
  });

  updateLanguage(html.lang || "en");
})();
