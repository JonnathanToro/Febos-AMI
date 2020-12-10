import clienteFebosAPI from '../clienteFebosAPI';

const RECURSO = '/herramientas/opciones';

const listOptions = (payload) => {
  const params = clienteFebosAPI.queryParams(payload);
  return clienteFebosAPI.get(`${RECURSO }?${params}`, { operacionId: 'cl.listar.opciones' });
};

const saveOption = (payload) => clienteFebosAPI.post(RECURSO, { opcion: payload }, { operacionId: 'cl.listar.opciones' });

export {
  listOptions,
  saveOption
};
