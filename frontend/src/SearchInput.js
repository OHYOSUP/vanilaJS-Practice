const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandomSearch }) {
    const $Container = document.createElement("section");
    const $searchInput = document.createElement("input");
    const $randomButton = document.createElement("button");

    // 클래스에 등록

    this.$searchInput = $searchInput;
    this.$Container = $Container;
    this.$randomButton = $randomButton;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    $searchInput.className = "SearchInput";
    $randomButton.className = "randomButton";

    $Container.appendChild($searchInput);
    $Container.appendChild($randomButton);
    $target.appendChild($Container);

    this.$randomButton.innerText = "랜덤고양이";

    $searchInput.addEventListener("keypress", (e) => {
      // 13 = enter
      if (e.key === "Enter") {
        // App.js 에서 정의한 onSearch
        onSearch(e.target.value);
        //최근 키워드
        this.KeywordHistory.addKeyword(e.target.value)
      }
    });

    $randomButton.addEventListener("click", (e) => {
      onRandomSearch();
    });

    this.KeywordHistory = new KeywordHistory({
      $target,
      onSearch,
    });
  }
  render() {}
}
