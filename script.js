const Countdown = {
  $el: document.querySelector('.countdown'),
  countdownInterval: null,
  totalSeconds: 0,
  values: {},

  init() {
    const hoursEl = this.$el.querySelector('.bloc-time.hours .figure');
    const minutesEl = this.$el.querySelector('.bloc-time.min .figure');
    const secondsEl = this.$el.querySelector('.bloc-time.sec .figure');

    this.values = {
      hours: parseInt(hoursEl.parentNode.getAttribute('data-init-value')),
      minutes: parseInt(minutesEl.parentNode.getAttribute('data-init-value')),
      seconds: parseInt(secondsEl.parentNode.getAttribute('data-init-value'))
    };

    this.totalSeconds = this.values.hours * 3600 + this.values.minutes * 60 + this.values.seconds;

    this.count();
  },

  count() {
    this.countdownInterval = setInterval(() => {
      if (this.totalSeconds > 0) {
        this.totalSeconds--;
        const hours = Math.floor(this.totalSeconds / 3600);
        const minutes = Math.floor((this.totalSeconds % 3600) / 60);
        const seconds = this.totalSeconds % 60;

        this.updateTime(hours, minutes, seconds);
      } else {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  },

  updateTime(hours, minutes, seconds) {
    this.updateFigure(this.$el.querySelector('.bloc-time.hours .figure'), hours);
    this.updateFigure(this.$el.querySelector('.bloc-time.min .figure'), minutes);
    this.updateFigure(this.$el.querySelector('.bloc-time.sec .figure'), seconds);
  },

  updateFigure(figureEl, value) {
    const topEl = figureEl.querySelector('.top');
    const backTopEl = figureEl.querySelector('.top-back');
    
    backTopEl.querySelector('span').textContent = value;
    topEl.textContent = value;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Countdown.init();
});
