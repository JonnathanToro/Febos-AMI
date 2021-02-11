import {indicatorFilesED} from '@/febos/servicios/api/dnt.api';

export const fetchIndicatorsTypes = async ({commit}) => {
  commit('SET_INDICATORS_LOADING', true);

  const response = await indicatorFilesED();
  commit('SET_INDICATORS', response.data.documentos);
  commit('SET_INDICATORS_LOADING', false);
};
