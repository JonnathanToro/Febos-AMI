export default {
  externo: () => require('./forms/external').default(),
  interno: () => require('./forms/internal').default(),
  numInt: () => require('./forms/internalNumeration').default(),
  numOf: () => require('./forms/oficialNumeration').default(),
  flujo: () => require('./forms/internalFlow').default()
};

export const types = {
  ext: 'externo',
  int: 'interno',
  numInt: 'numInt',
  numOf: 'numOf'
};
