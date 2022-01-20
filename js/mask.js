class Mask {
  constructor(opt) {
    this.init(opt);
    this.bindingEvent();
  }

  init(opt) {
    this.btns = document.querySelectorAll(opt.btns);
    this.panels = document.querySelectorAll(opt.panels);
    this.vids = document.querySelectorAll('video')
    this.class_names = opt.class_names;
    this.enableClick = true;
  }

  bindingEvent() {
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








