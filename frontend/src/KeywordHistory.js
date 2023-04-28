class KeywordHistory {
  $KeywordHistory = null;
  data = null;

  constructor({ $target, onSearch }) {
    const $KeywordHistory = document.createElement("ul");
    this.$KeywordHistory = $KeywordHistory;
    this.$KeywordHistory.className = "KeywordHistory";
    $target.appendChild(this.$KeywordHistory);
    // this.data = ["샴", "코리안", "헤어"];
    this.onSearch = onSearch;
    this.init();
    this.render();
  }

  init() {
    const data = this.getHistory();    
    this.setState(data);
  }

  addKeyword(keyword) {
    let KeywordHistory = this.getHistory();
    localStorage.getItem("KeywordHistory");
    KeywordHistory.unshift(keyword);
    KeywordHistory = KeywordHistory.slice(0, 5);
    localStorage.setItem("KeywordHistory", KeywordHistory.join(","));
    // 리랜더링
    this.init(); 
  }

  getHistory() {
    return localStorage.getItem("KeywordHistory") === null
      ? []
      : localStorage.getItem("KeywordHistory").split(",");
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }


  render() {
    this.$KeywordHistory.innerHTML = this.data
      .map(
        (keyword) => `
    <li><button>${keyword}</button></li>`
      )
      .join("");

    this.$KeywordHistory.querySelectorAll("li button").forEach(($item, index) =>
      $item.addEventListener("click", () => {        
        this.onSearch(this.data[index]);
      })
    );
  }
}
