class DarkModeToggle {
  // state추가
  isDarkMode = null;

  constructor({ $target }) {
    const $Container = document.createElement("section");
    const $DarkModeToggle = document.createElement("input");
    // 클래스에 등록
    this.$DarkModeToggle = $DarkModeToggle;
    this.$Container = $Container
    this.$DarkModeToggle.type = "checkbox";
    
    $DarkModeToggle.className = "DarkModeToggle";
    $Container.appendChild($DarkModeToggle);
    $target.appendChild($Container);
    
    
    $DarkModeToggle.addEventListener("change", (e) => {
      this.setColorMode(e.target.checked);
    });

    this.initColorMode();
  }
  //초기화
  // isDrakMode state, chekbox상태, html attr
  initColorMode() {
    this.isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    this.$DarkModeToggle.checked = this.isDarkMode;
    this.setColorMode(this.isDarkMode);
  }
  
  setColorMode(mode) {
    document.documentElement.setAttribute(
      "color-mode",
      mode ? "dark" : "light"
    );
  }
}
