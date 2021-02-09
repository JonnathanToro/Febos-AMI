import Vue from 'vue';

Vue.filter('capitalize', (value) => {
  const word = value;
  if (!word) return '';
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
});

Vue.filter('truncate', (value, limit) => value.substring(0, limit));

Vue.filter('tailing', (value, tail) => value + tail);

Vue.filter('time', (value, is24HrFormat = false) => {
  let timeReturn = '';
  if (value) {
    let time = '';
    const date = new Date(Date.parse(value));
    let hours = date.getHours();
    const min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    if (!is24HrFormat) {
      time = hours > 12 ? 'AM' : 'PM';
      hours = hours % 12 || 12;
      return `${hours }:${ min } ${ time}`;
    }
    timeReturn = `${hours}:${min} ${time}`;
  }
  return timeReturn;
});

Vue.filter('date', (value, fullDate = false) => {
  const date = value.slice(8, 10).trim();
  const month = value.slice(4, 7).trim();
  const year = value.slice(11, 15);

  if (!fullDate) return `${date } ${ month}`;
  return `${date } ${ month } ${ year}`;
});

Vue.filter('csv', (value) => value.join(', '));

Vue.filter('dateFormat', (value) => Vue.moment(value).format('DD-MM-YYYY'));
Vue.filter('dateCompleteFormat', (value) => Vue.moment(value).format('LLL'));

Vue.filter('filter_tags', (value) => value.replace(/<\/?[^>]+(>|$)/g, ''));

Vue.filter('k_formatter', (num) => (num > 999 ? `${(num / 1000).toFixed(1) }k` : num));
