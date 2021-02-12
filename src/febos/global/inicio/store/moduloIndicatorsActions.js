import {indicatorFilesED} from '@/febos/servicios/api/dnt.api';

export const fetchIndicatorsTypes = async ({commit}) => {
  commit('SET_INDICATORS_LOADING', true);

  const response = await indicatorFilesED();
  try{
    commit('SET_GLOBAL_INDICATORS', response.data.documentos);
    commit('SET_PERSONAL_INDICATORS', response.data.documentos);
  }finally{
    commit('SET_INDICATORS_LOADING', false);
  }

};
