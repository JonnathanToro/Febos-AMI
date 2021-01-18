import apiClient from '../clienteFebosAPI';

const RESOURCE = '/tickets';

export const sendTicket = (payload) => {
  const params = apiClient.queryParams(payload);

  return apiClient.post(`${RESOURCE}?${params}`,
    payload,
    { operacionId: 'io.send.ticket' });
};
