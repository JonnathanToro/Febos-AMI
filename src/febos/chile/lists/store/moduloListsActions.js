import { listOptions } from '@/febos/servicios/api/opciones.api';
import { getUsers } from '@/febos/servicios/api/usuarios.api';
import { ioCompanyGroups, getUsersByGroup } from '@/febos/servicios/api/empresas.api';

export const fetchDocumentTypes = async ({ commit }) => {
  commit('SET_DOCUMENT_TYPES_LOADING', true);

  const response = await listOptions({
    grupoOpcion: 'tipos.documentos-ed',
    deshabilitado: 'no'
  });

  commit('SET_DOCUMENT_TYPES', response.data.opciones);
  commit('SET_DOCUMENT_TYPES_LOADING', false);
};

export const fetchDocuments = async ({ commit }, payload) => {
  commit('SET_DOCUMENTS_LOADING', true);

  const response = await listOptions({
    grupoOpcion: `tipos.documentos-ed.${payload}.item`,
    deshabilitado: 'no'
  });

  commit('SET_DOCUMENTS', response.data.opciones);
  commit('SET_DOCUMENTS_LOADING', false);
};

export const fetchAllDocuments = async ({ commit }) => {
  commit('SET_ALL_DOCUMENTS_LOADING', true);

  const response = await listOptions({
    grupoOpcion: 'tipos.documentos-ed',
    deshabilitado: 'no',
    agrupar: 'si'
  });

  commit('SET_ALL_DOCUMENTS', response.data.opciones);
  commit('SET_ALL_DOCUMENTS_LOADING', false);
};

export const fetchInstitutionTypes = async ({ commit }) => {
  commit('SET_INSTITUTION_TYPES_LOADING', true);

  const response = await listOptions({
    grupoOpcion: 'tipos.instituciones-ed',
    deshabilitado: 'no'
  });

  commit('SET_INSTITUTION_TYPES', response.data.opciones);
  commit('SET_INSTITUTION_TYPES_LOADING', false);
};

export const fetchInstitutions = async ({ commit }, payload) => {
  commit('SET_INSTITUTIONS_LOADING', true);

  const response = await listOptions({
    grupoOpcion: `tipos.instituciones-ed.${payload}.item`,
    deshabilitado: 'no'
  });

  commit('SET_INSTITUTIONS', response.data.opciones);
  commit('SET_INSTITUTIONS_LOADING', false);
};

export const fetchInstitutionsDocDigital = async ({ commit }, payload) => {
  commit('SET_INSTITUTIONS_DOC_DIGITAL_LOADING', true);
  const response = await listOptions({
    grupoOpcion: 'io.doc.digital.entidades',
    deshabilitado: 'no',
    orden: payload
  });

  commit('SET_INSTITUTIONS_DOC_DIGITAL', response.data.opciones);
  commit('SET_INSTITUTIONS_DOC_DIGITAL_LOADING', false);
};

export const fetchUsers = async (
  { commit, rootState },
  { page = 1, limit = 10, query }
) => {
  commit('SET_LIST_LOADING', { target: 'users', value: true });

  const appendQuery = query
    ? { filtro: query }
    : {};

  const {
    data: {
      usuarios: value,
      totalPaginas: pages
    }
  } = await getUsers({
    empresaId: rootState.Empresas.empresa.id,
    pagina: page,
    filas: limit,
    ...appendQuery
  });
  const state = { value, limit, pages: parseInt(pages, 10) };
  commit('SET_LIST_STATUS', {
    target: 'users',
    ...state,
  });

  commit('SET_LIST_LOADING', { target: 'users', value: false });
  return state;
};

export const fetchSubjects = async ({ commit, rootState }, payload) => {
  commit('SET_SUBJECTS_LOADING', true);
  commit('SET_SUBJECTS', []);

  switch (payload) {
    case 'unidades': {
      const response = await ioCompanyGroups(
        { empresaId: rootState.Empresas.empresa.id }
      );
      commit('SET_SUBJECTS', { type: payload, list: response.data.grupos });
      break;
    }
    case 'oficinas': {
      const response = await ioCompanyGroups(
        { empresaId: rootState.Empresas.empresa.id, esOficina: 'Y' }
      );
      commit('SET_SUBJECTS', { type: payload, list: response.data.grupos });
      break;
    }
    case 'docDigital': {
      const response = await listOptions({
        grupoOpcion: 'io.doc.digital.organismo',
        deshabilitado: 'no'
      });
      commit('SET_SUBJECTS', { type: payload, list: response.data.opciones });
      commit('SET_INSTITUTIONS_DOC_DIGITAL', []);
      break;
    }
    case 'ministerios': {
      const response = await listOptions({
        grupoOpcion: 'tipos.destinos-ed.OIP.item',
        deshabilitado: 'no'
      });
      commit('SET_SUBJECTS', { type: payload, list: response.data.opciones });
      break;
    }
    default:
      console.log('Esta opcion no tiene request');
      break;
  }
  commit('SET_SUBJECTS_LOADING', false);
};

export const fetchGroups = async ({ commit, rootState }) => {
  commit('SET_GROUPS_LOADING', true);
  commit('SET_GROUPS', []);
  const response = await ioCompanyGroups(
    { empresaId: rootState.Empresas.empresa.id }
  );
  commit('SET_GROUPS', response.data.grupos);
  commit('SET_GROUPS_LOADING', false);
};

export const getUsersGroup = async ({ commit, rootState }, groupId) => {
  commit('SET_GROUP_USERS_LOADING', true);
  commit('SET_GROUP_USERS', []);
  const response = await getUsersByGroup({
    empresaId: rootState.Empresas.empresa.id,
    pagina: 1,
    filas: 9999,
    groupId
  });
  commit('SET_GROUP_USERS', response.data.usuarios);
  commit('SET_GROUP_USERS_LOADING', false);
};

export const fetchActivities = async ({ commit }) => {
  commit('SET_ACTIVITIES_LOADING', true);

  console.log('soy actividad', 'tipos.actividades-ed');

  const response = await listOptions({
    grupoOpcion: 'tipos.actividades-ed',
    deshabilitado: 'no'
  });

  commit('SET_ACTIVITIES', response.data.opciones);
  commit('SET_ACTIVITIES_LOADING', false);
};

export const fetchActivityStates = async ({ commit }, payload) => {
  commit('SET_ACTIVITY_STATES_LOADING', true);

  const response = await listOptions({
    grupoOpcion: `tipos.actividades-ed.${payload}.item`,
    deshabilitado: 'no'
  });

  commit('SET_ACTIVITY_STATES', response.data.opciones);
  commit('SET_ACTIVITY_STATES_LOADING', false);
};

export const fetchUserGroups = async ({ commit, rootState }) => {
  commit('SET_USER_GROUPS_LOADING', true);
  commit('SET_USER_GROUPS', []);
  const response = await ioCompanyGroups(
    {
      empresaId: rootState.Empresas.empresa.id,
      filtros: `usuarioId:${ rootState.Usuario.id }`
    }
  );
  commit('SET_USER_GROUPS', response.data.grupos);
  commit('SET_USER_GROUPS_LOADING', false);
};
