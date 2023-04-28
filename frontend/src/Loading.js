class Loading {
  $loading = null;
  data = null;

  constructor({ $target, data }) {
    const $loanding = document.createElement("div");    
    this.$loanding = $loanding;
    $target.appendChild($loanding);

    this.data= {
      show: false
    }
      this.render();
  }

  show(){
    this.setState({
      show: true
    })
  }
  hide(){
    this.setState({
      show: false
    })
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }
  render(){
    if(this.data.show){
      this.$loanding.innerHTML = `
      <div class="Loading">
        <p>로딩중</p>
      </div>
      `
    }else{
      this.$loanding.innerHTML = ""
    }
  
    }
  }

  
