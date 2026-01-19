(() => {
  // VARIABLES
  const html = document.documentElement;
  const sizeChanger = document.getElementById("size_changer");
  const switchers = document.querySelectorAll("#language_switcher > button");
  const titleElement = document.getElementsByTagName("title")[0];
  const formElement = document.getElementById("sign_up");
  // ACCESSIBILITY
  sizeChanger.addEventListener("click", () => {
    const isDefault = sizeChanger.dataset.size === "default";
    const newSize = isDefault ? "enlarged" : "default";
    sizeChanger.dataset.size = newSize;
    html.style.fontSize = isDefault ? "150%" : "100%";
    sizeChanger.querySelectorAll(".sizeChanger").forEach((el) => {
      el.style.display = el.dataset.size === newSize ? "unset" : "none";
    });
  });
  // FORM
  Pristine.addMessages("cy", {
    required: "Mae angen y maes hwn",
    email: "Mae angen cyfeiriad e-bost dilys ar y maes hwn",
    number: "Mae angen rhif ar y maes hwn",
    integer: "Mae angen gwerth cyfanrif ar y maes hwn",
    url: "Mae angen URL gwefan ddilys ar y maes hwn",
    tel: "Mae angen rhif ffôn dilys yn y maes hwn",
    maxlength: "This fields length must be < ${1}",
    minlength: "Rhaid i hyd y maes hwn fod yn > ${1}",
    min: "Isafswm gwerth ar gyfer y maes hwn yw ${1}",
    max: "Gwerth mwyaf y maes hwn yw ${1}",
    pattern: "Cydweddwch y fformat gofynnol",
    equals: "Nid yw'r ddau faes yn cyfateb",
    default: "Rhowch y gwerth cywir",
  });
  Pristine.setLocale("en");
  const pristine = new Pristine(formElement, {
    classTo: "form-group",
    errorClass: "has-danger",
    successClass: "has-success",
    errorTextParent: "form-group",
    errorTextTag: "div",
    errorTextClass: "error-message",
  });
  pristine.addValidator(
    document.getElementById("dob"),
    (value) => {
      if (value) {
        const today = Temporal.Now.plainDateISO();
        const dob = Temporal.PlainDate.from(value);
        const age = today.since(dob, { largestUnit: "years" }).years;
        return age >= 18 && age <= 67;
      }
    },
    () =>
      html.lang === "en"
        ? "Age must be between 18 and 67"
        : "Rhaid i'r oedran fod rhwng 18 a 67",
  );
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = pristine.validate();
    if (!valid) {
      console.warn(
        html.lang === "en"
          ? "There are invalid entries in the form."
          : "Mae cofnodion annilys yn y ffurflen.",
      );
    }
  });
  // LANGUAGE
  const updateLanguage = (lang) => {
    const langKey = lang.charAt(0).toUpperCase() + lang.slice(1); // 'en' -> 'En', 'cy' -> 'Cy'
    // Update Document Title
    const titleText = titleElement.dataset[`lang${langKey}`];
    if (titleText) document.title = titleText;
  };
  switchers.forEach((switcher) => {
    switcher.onclick = () => {
      const lang = switcher.getAttribute("lang");
      if (!lang) return;
      switchers.forEach((el) => el.classList.remove("active"));
      switcher.classList.add("active");
      html.lang = lang;
      Pristine.setLocale(lang);
      updateLanguage(lang);
      document.body.dispatchEvent(new CustomEvent("lang-change"));
    };
  });
  updateLanguage(html.lang || "en");
})();
