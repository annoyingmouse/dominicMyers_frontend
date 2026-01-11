// https://github.com/Tangerine-Community/translation-web-component/blob/main/t-lang.js
/**
 * `t-lang`
 * @customElement
 * @demo demo/index.html
 */
class TLang extends HTMLElement {
  connectedCallback() {
    this.render();
    document.body.addEventListener("lang-change", this.render.bind(this));
  }
  render() {
    if (document.documentElement.lang.length > 0) {
      if (
        !this.attributes.hasOwnProperty(
          document.documentElement.lang.toLowerCase(),
        )
      ) {
        this.style.setProperty("display", "none");
      } else {
        this.style.setProperty("display", "inline");
      }
    }
  }
}
window.customElements.define("t-lang", TLang);
