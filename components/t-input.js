export class TInput extends HTMLInputElement {
  constructor() {
    super();
    this._onMutation = () => this.render();
  }

  connectedCallback() {
    // We use a small delay to ensure dataset is ready
    Promise.resolve().then(() => {
      if (!this.dataset.default) {
        // Fallback to current placeholder if data-default isn't set
        this.dataset.default = this.placeholder || "";
      }
      this.render();
    });

    this._observer = new MutationObserver(this._onMutation);
    this._observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  }

  render() {
    const currentLang = (document.documentElement.lang || "en")
      .toLowerCase()
      .split("-")[0];

    // Look for data-en, data-cy, etc.
    const translation = this.dataset[currentLang];
    const defaultValue = this.dataset.default;

    const targetPlaceholder = translation || defaultValue;

    if (this.placeholder !== targetPlaceholder) {
      this.placeholder = targetPlaceholder;
    }
  }

  disconnectedCallback() {
    if (this._observer) {
      this._observer.disconnect();
    }
  }
}

window.customElements.define("t-input", TInput, { extends: "input" });
