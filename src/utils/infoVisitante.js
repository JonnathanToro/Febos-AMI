import moment from 'moment';
import platform from 'platform';

export default {
  horaLocal() {
    return `${moment().format('LT')} (${moment().format('Z')})`;
  },
  navegador() {
    return `${platform.name} ${platform.version} / ${platform.os}`;
  },
  localizacion() {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          position => resolve(position.coords),
          reject,
          {}
        )
      });
    }
    return Promise.reject('Navegador no soporta geolocalizacion');
  },
  urlActual() {
    return window.location.href;
  }
}
