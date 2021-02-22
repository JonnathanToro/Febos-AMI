export default {
  externo: () => require('./forms/external').default(),
  interno: () => require('./forms/internal').default(),
  numInt: () => require('./forms/internalNumeration').default(),
  numOf: () => require('./forms/oficialNumeration').default()
};
