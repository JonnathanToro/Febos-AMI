import { listOptions } from '@/febos/servicios/api/opciones.api';
import { getUsers } from '@/febos/servicios/api/usuarios.api';
import { ioCompanyGroups } from '@/febos/servicios/api/empresas.api';

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

export const fetchSubjects = async ({ commit, rootState }, payload) => {
  commit('SET_SUBJECTS_LOADING', true);

  switch (payload) {
    case 'usuarios': {
      commit('SET_SUBJECTS', []);
      const response = await getUsers({
        empresaId: rootState.Empresas.empresa.id,
        pagina: 1,
        filas: 9999
      });

      commit('SET_SUBJECTS', { type: payload, list: response.data.usuarios });
      break;
    }
    case 'unidades': {
      commit('SET_SUBJECTS', []);
      const response = await ioCompanyGroups(
        { empresaId: rootState.Empresas.empresa.id }
      );
      commit('SET_SUBJECTS', { type: payload, list: response.data.grupos });
      break;
    }
    case 'oficinas': {
      commit('SET_SUBJECTS', []);
      const response = await ioCompanyGroups(
        { empresaId: rootState.Empresas.empresa.id, esOficina: 'Y' }
      );
      commit('SET_SUBJECTS', { type: payload, list: response.data.grupos });
      break;
    }
    case 'docDigital': {
      commit('SET_SUBJECTS', []);
      const response = await listOptions({
        grupoOpcion: 'io.doc.digital.organismo',
        deshabilitado: 'no'
      });
      commit('SET_SUBJECTS', { type: payload, list: response.data.opciones });
      commit('SET_INSTITUTIONS_DOC_DIGITAL', []);
      break;
    }
    case 'ministerios': {
      commit('SET_SUBJECTS', []);
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
