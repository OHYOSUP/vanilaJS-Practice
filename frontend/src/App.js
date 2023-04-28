console.log("app is running!");

class App {
  // $ => 변수선언(dom)
  $target = null;
  data = [];
  page = 1;

  constructor($target) {
    this.$target = $target;

    this.Loading = new Loading({
      $target,
    });

    // this.Empty = new Empty({
    //   $target,
    // });

    this.DarkModeToggle = new DarkModeToggle({
      $target,
    });



    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        this.Loading.show();
        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data);
          this.Loading.hide();
          // 로컬에 저장
          this.saveResult(data);          
        });
      },
      onRandomSearch: () => {
        console.log("random!");
        this.Loading.show();
        api.fetchRandomCats().then(({ data }) => {
          this.setState(data);
          this.Loading.hide();
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (cat) => {
        this.imageInfo.showDetail({
          visible: true,
          cat,
        });
      },
      onNextPage: () => {
        const keywordHistory =
          localStorage.getItem("KeywordHistory") === null
            ? []
            : localStorage.getItem("KeywordHistory").split(",");

        let lastKeyword = keywordHistory[0];
        let page = this.page + 1;
        this.Loading.show();
        api.fetchCatsPage(lastKeyword, 2).then(({ data }) => {
          let newData = this.data.concat(data);
          this.setState(newData);
          this.Loading.hide();
          this.page = page;
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
    this.init();
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  saveResult(result) {
    localStorage.setItem("lastestKeyword", JSON.stringify(result));
  }
  lastestSearchKeyword(keyword) {
    localStorage.setItem("lastestSearchKeyword", JSON.stringify(keyword));
  }

  init() {
    const latestResult =
      localStorage.getItem("lastestKeyword") === null
        ? []
        : JSON.parse(localStorage.getItem("lastestKeyword"));

    this.setState(latestResult);

    const lastestSearchKeyword =
      localStorage.getItem("lastestSearchKeyword") === null
        ? []
        : JSON.parse(localStorage.getItem("lastestSearchKeyword")).split(
            ","
          )[0];
    this.searchInput.$searchInput.value = lastestSearchKeyword;
  }
}
