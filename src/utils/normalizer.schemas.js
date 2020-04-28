import { schema } from 'normalizr';


export const DocumentoEntity = new schema.Entity('documentos', undefined, {
  idAttribute: value => value.febos_id
});

export const CasosEntity = new schema.Entity('casos', undefined, {
  idAttribute: value => value.casoId
});
