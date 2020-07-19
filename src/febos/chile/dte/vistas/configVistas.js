// Carga automatica de las vistas de DTE para todos los portales

const archivos={
  cloud:{
    emitidos:require.context('./cloud/emitidos/', true, /.*(\.js)$/),
    recibidos:require.context('./cloud/recibidos/', true, /.*(\.js)$/),
  },
  proveedores:{
    emitidos:require.context('./proveedores/emitidos/', true, /.*(\.js)$/),
    recibidos:require.context('./proveedores/recibidos/', true, /.*(\.js)$/),
  },
  clientes:{
    emitidos:require.context('./clientes/emitidos/', true, /.*(\.js)$/),
    recibidos:require.context('./clientes/recibidos/', true, /.*(\.js)$/),
  },
}

const vistas={
  cloud:{
    emitidos:{},
    recibidos:{}
  },
  proveedores:{
    emitidos:{},
    recibidos:{}
  },
  clientes:{
    emitidos:{},
    recibidos:{}
  }
};
// recorre los portales y categorias importanto las vistas correspondientes

Object.keys(archivos).forEach(portal => {
  Object.keys(archivos[portal]).forEach(categoria => {
    archivos[portal][categoria].keys().forEach( archivo => {
        let nombreVista = archivo.split('/').pop().replace(".js", "");
        vistas[portal][categoria][nombreVista] = archivos[portal][categoria](archivo).default;
    });
  });
});

export default vistas
