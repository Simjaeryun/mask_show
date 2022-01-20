class Mask {
  constructor(opt) {
    this.createDOM(opt)
  }

  async createDOM(opt) {
    const section = document.querySelector(opt.frame);

    await fetch('js/data.json')
      .then(data => {
        return data.json()
      })
      .then(json => {
        const items = json.data;

        let tags = '';
        items.forEach((item, index) => {
          tags += `
          <article class='mask'>
            <video src=${item.src} autoplay muted loop></video>
            <div class="slogan">
              <h2>
                <div class="inner">${item.tit}</div>
              </h2><br>
    
              <div class="p1">
                <div class="inner">
                  ${item.p1}
                </div>
              </div><br>
    
              <div class="p2">
                <div class="inner">
                  ${item.p2}
                </div>
              </div>
            </div>
          </article>
          `
        })
        section.innerHTML = tags;
        const item1 = document.querySelector('article');
        item1.classList.add("on");
      })
    this.init(opt);
    this.bindingEvent();
  }


  init(opt) {
    this.btns = document.querySelectorAll(opt.btns);
    this.panels = document.querySelectorAll(opt.panels);
    this.vids = document.querySelectorAll('video');
    this.loading = document.querySelector("aside");
    this.class_names = opt.class_names;
    this.enableClick = true;
    this.count = 0;
  }

  bindingEvent() {
    this.vids.forEach((vid, index) => {
      vid.addEventListener("loadeddata", () => {
        this.count++;
        console.log(this.count);
        if (this.count === this.vids.length) {
          this.loading.style.display = "none"
        }
      })
    })
    setTimeout(() => {
      this.panels.forEach(panel => panel.classList.remove("mask"))
    }, 1400)

    this.btns.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        const isOn = e.currentTarget.classList.contains(this.class_names.on);
        if (isOn) return;

        if (this.enableClick) {
          this.enableClick = false;
          this.activation(index);
        }
      })
    })
  }

  activation(index) {
    this.vids[index].load();
    this.vids[index].play();
    for (let i = 0; i < this.btns.length; i++) {
      this.btns[i].classList.remove(this.class_names.on)

      if (this.panels[i].classList.contains(this.class_names.on)) {
        this.panels[i].classList.add(this.class_names.mask);
      }
    }


    this.btns[index].classList.add(this.class_names.on);
    this.panels[index].classList.add(this.class_names.lower);

    setTimeout(() => {
      for (let i = 0; i < this.panels.length; i++) {
        if (this.panels[i].classList.contains(this.class_names.on)) {
          this.panels[i].classList.remove(this.class_names.on);
          this.panels[i].classList.remove(this.class_names.mask);
        }
      }

      this.panels[index].classList.remove(this.class_names.lower);
      this.panels[index].classList.add(this.class_names.on);

      setTimeout(() => {
        this.enableClick = true
      }, 1400);
    }, 1400)
  }
}








