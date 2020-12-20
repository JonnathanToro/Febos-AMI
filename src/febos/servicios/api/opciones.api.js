import clienteFebosAPI from '../clienteFebosAPI';

const RECURSO = '/herramientas/opciones';

const listOptions = (payload) => {
  const params = clienteFebosAPI.queryParams(payload);
  return clienteFebosAPI.get(`${RECURSO }?${params}`, { operacionId: 'cl.list.option' });
};

const saveOption = (payload) => clienteFebosAPI.post(RECURSO, { opcion: payload }, { operacionId: 'cl.create.option' });

export {
  listOptions,
  saveOption
};
