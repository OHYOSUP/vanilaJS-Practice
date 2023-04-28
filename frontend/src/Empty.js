class Empty {
  $empty = null;
  data = null;
  isNull = null;

  constructor({ $target, data }) {
    const $empty = document.createElement("div");
    this.$empty = $empty;
    this.$empty.className = "Empty";
    $target.appendChild($empty);

    this.data = {
      show: true,
    };
    this.render();
  }

  show(data) {
    this.setState({
      show: data.length === 0 || data === null,
      isNull: data === null,
    });
  }
  hide() {
    this.setState({
      show: false,
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }
  render() {
    if (this.data.show) {
      if (this.data.isnull) {
        this.$empty.style.display = "block";
        this.$empty.innerHTML = `      
          <p>요청에 실패했습니다.</p>      
        `;
      } else {
        this.$empty.style.display = "block";
        this.$empty.innerHTML = `      
          <p>요청 결과가 없습니다.</p>      
        `;
      }
    } else {
      this.$empty.style.display = "none";
      this.$empty.innerHTML = "";
    }
  }
}
