// Carga automatica de las vistas de DTE para todos los portales

const archivos = {
  cloud: {
    entrance: require.context('./cloud/entrance/', true, /.*(\.js)$/),
    processed: require.context('./cloud/processed/', true, /.*(\.js)$/),
  }
};

const vistas = {
  cloud: {
    entrance: {},
    procesed: {}
  }
};
// recorre los portales y categorias importanto las vistas correspondientes

Object.keys(archivos).forEach((portal) => {
  Object.keys(archivos[portal]).forEach((categoria) => {
    archivos[portal][categoria].keys().forEach((archivo) => {
      const nombreVista = archivo.split('/').pop().replace('.js', '');
      vistas[portal][categoria][nombreVista] = archivos[portal][categoria](archivo).default;
    });
  });
});

export default vistas;
