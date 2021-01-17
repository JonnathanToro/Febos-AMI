import { clDntsList, clDntDetails } from '@/febos/servicios/api/dnt.api';
import { getOption } from '@/febos/servicios/api/opciones.api';

export const listDocuments = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await clDntsList(payload);
  commit('SET_LISTADO_DNT', response.data);
  commit('SET_LOADING', false);
  return response.data;
};

export const actualizarPagina = ({ commit }, payload) => {
  console.log('aCA', payload);
  commit('ACT_PAGINA_BANDEJA', payload);
};

export const detailDnt = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await clDntDetails(payload);
  commit('SET_DETAIL_DNT', response.data);
  commit('SET_LOADING', false);
  return response.data;
};

export const getFormTemplate = async ({ commit }, payload) => {
  commit('SET_LOADING', true);
  const response = await getOption(payload.febosId);

  const {
    descripcion: name,
    extra,
    // eslint-disable-next-line no-unused-vars
    ...ignored
  } = response.data.opcion;

  if (!extra) {
    throw new Error('option w/o template information');
  }

  try {
    const {
      descripcion: description,
      schema
    } = JSON.parse(extra);
    commit('SET_FORM_TEMPLATE', payload.febosId, {
      name,
      description,
      schema
    });
  } catch (e) {
    throw new Error('option with invalid template');
  }

  commit('SET_LOADING', false);
};
