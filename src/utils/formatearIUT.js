
// export default (iut) => {
//   switch (entorno.obtenerTld()) {
//
//     case 'cl': {
//       const partes = iut.split("-");
//       const numero = partes[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//       return `${numero}-${partes[1]}`;
//     }
//
//     default:
//       return iut;
//   }
// }

export const clean = rut => (typeof rut === 'string'
    ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
    : ''
);

export const validate = (dirtyRut) => {
  if (!dirtyRut) return false;
  if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(dirtyRut)) {
    return false;
  }

  const inputRut = dirtyRut.replace(/[.-]/g, '');

  if (inputRut.length < 2) {
    return false;
  }

  const rut = inputRut.substr(0, inputRut.length - 1);

  if (Number.isNaN(parseInt(rut, 10))) {
    return false;
  }
  const dv = inputRut.charAt(inputRut.length - 1).toUpperCase();

  let s = 0;
  let m = 2;

  for (let i = rut.length - 1; i >= 0; i -= 1) {
    s += rut.charAt(i) * m;
    m = (m + 1) % 8 || 2;
  }

  switch (s % 11) {
    case 1: return dv === 'K';
    case 0: return dv === '0';
    default: return (11 - (s % 11)).toString().toUpperCase() === dv;
  }
};

export default (rut) => {
  const cleanRut = clean(rut);

  let result = `${cleanRut.slice(-4, -1)}-${cleanRut.substr(cleanRut.length - 1)}`;
  for (let i = 4; i < cleanRut.length; i += 3) {
    result = `${cleanRut.slice(-3 - i, -i)}.${result}`;
  }

  return result;
};
