class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  async showDetail(data) {
    await api.showCatDetail(data.cat.id).then(({ data }) => {
      this.setState({
        visible: true,
        cat: data,
      });
    });
  }

  closeModal() {
    this.setState({
      vidible: false,
      data: null,
    });
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.cat;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";
      // this.$imageInfo
      //   .querySelector(".close")
      //   .addEventListener("click", () => this.closeModal());
      // keypress, keydown, keyup
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.closeModal();
        }
      });

      this.$imageInfo.addEventListener("click", (e) => {
        if (
          e.target.className === "ImageInfo" ||
          e.target.className === "close"
        ) {
          this.closeModal();
        }
      });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
