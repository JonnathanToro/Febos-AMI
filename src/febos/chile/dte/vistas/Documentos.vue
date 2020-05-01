
<template>
  <vx-card :title="config.titulo" >
    <table>
      <thead>
      <tr>
        <th class="selector">
          <vs-checkbox></vs-checkbox>
        </th>
        <th v-for="(campo,index) in campos" :key="index" :width="campo.ancho">{{ campo.nombre }}</th>
        <th>&nbsp;</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="doc in documentos" :key="doc.febosId">
        <td class="selector">
          <vs-checkbox></vs-checkbox>
        </td>
        <td v-for="(campo,index) in campos" :key="index">
          <component :is="cargarComponenteCampo(campo.campo)" :documento="doc"></component>
        </td>
        <td>
            <AccionesWrapper :acciones="config.acccionesIndividuales" :documento="doc"></AccionesWrapper>
        </td>
      </tr>
      </tbody>
    </table>
    <vs-pagination :total="totalPaginas" :value="paginaActual" class="mt-10"></vs-pagination>
  </vx-card>
</template>

<script>
  import CamposListadoFacturaElectronicaMixin from "../mixins/CamposListadoFacturaElectronicaMixin";
  import AccionesWrapper from "../componentes/AccionesWrapper";
  import configVistas from "./configVistas";

  export default {
    components: {AccionesWrapper},
    mixins:[CamposListadoFacturaElectronicaMixin],
    data() {
      return {
        respuestaApiSimulada:{"paginas":2,"pagina":1,"encontrados":39,"retornados":20,"documentos":[{"febosId":"46dfe7802282f2462428964231412cc64053","tipoDocumento":33.0,"folio":1217.0,"fechaEmision":"2020-04-09","formaDePago":2.0,"fechaVencimiento":"2020-05-09","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"99551740-K","razonSocialReceptor":"E SIGN S A","contacto":"224331500","correoReceptor":"99551740-K@febos.cl","iva":35359.0,"montoTotal":221458.0,"estadoSii":4.0,"estadoComercial":7.0,"fechaRecepcion":"2020-04-09","fechaRecepcionSii":"2020-04-09","tipo":2.0,"trackId":4.511329468E9,"tpoTraVenta":1.0,"fechaReciboMercaderia":"2020-04-16","plazo":-11.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"V","diasParaPago":11.0},{"febosId":"6777d6532548c242a1292a52d96467845577","tipoDocumento":33.0,"folio":1216.0,"fechaEmision":"2020-04-09","formaDePago":2.0,"fechaVencimiento":"2020-05-09","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"99551740-K","razonSocialReceptor":"E SIGN S A","contacto":"224331500","correoReceptor":"99551740-K@febos.cl","iva":35359.0,"montoTotal":221458.0,"estadoSii":4.0,"estadoComercial":7.0,"fechaRecepcion":"2020-04-09","fechaRecepcionSii":"2020-04-09","tipo":2.0,"trackId":4.511329468E9,"tpoTraVenta":1.0,"fechaReciboMercaderia":"2020-04-16","plazo":-11.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"V","diasParaPago":11.0},{"febosId":"66b864772d9622477b2b50423491e10be766","tipoDocumento":33.0,"folio":1215.0,"fechaEmision":"2020-04-09","formaDePago":2.0,"fechaVencimiento":"2020-05-09","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"99551740-K","razonSocialReceptor":"E SIGN S A","contacto":"224331500","correoReceptor":"99551740-K@febos.cl","iva":35359.0,"montoTotal":221458.0,"estadoSii":4.0,"estadoComercial":7.0,"fechaRecepcion":"2020-04-09","fechaRecepcionSii":"2020-04-09","tipo":2.0,"trackId":4.511327994E9,"tpoTraVenta":1.0,"fechaReciboMercaderia":"2020-04-16","plazo":-11.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"V","diasParaPago":11.0},{"febosId":"64bd8b372e23c240ae2b8c02c4cdcd082cf1","tipoDocumento":33.0,"folio":1214.0,"fechaEmision":"2020-04-09","formaDePago":2.0,"fechaVencimiento":"2020-05-09","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"96986170-4","razonSocialReceptor":"SEIDOR CHILE S.A.","correoReceptor":"96986170-4@prd.inbox.febos.cl","iva":2187837.0,"montoTotal":1.370277E7,"estadoSii":4.0,"estadoComercial":7.0,"fechaRecepcion":"2020-04-09","fechaRecepcionSii":"2020-04-09","tipo":0.0,"trackId":4.511318856E9,"tpoTraVenta":1.0,"plazo":-11.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"V","diasParaPago":11.0},{"febosId":"555b79fc2004d246db283f72e3cbb11c2fc1","tipoDocumento":34.0,"folio":496.0,"fechaEmision":"2020-04-02","formaDePago":2.0,"fechaVencimiento":"2020-05-02","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"76458110-5","razonSocialReceptor":"SOLUCIONES TECNOLOGICAS DE NEGOCIOS SPA","correoReceptor":"Contabilidad@altiuz.cl","montoTotal":1158347.0,"estadoSii":4.0,"estadoComercial":7.0,"fechaRecepcion":"2020-04-02","fechaRecepcionSii":"2020-04-02","tipo":0.0,"trackId":4.495304268E9,"tpoTraVenta":1.0,"plazo":-18.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"V","diasParaPago":4.0},{"febosId":"19e981632cdc7243e82af152572f7979b1e0","tipoDocumento":33.0,"folio":1213.0,"fechaEmision":"2020-04-02","formaDePago":2.0,"fechaVencimiento":"2020-05-02","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"76449081-9","razonSocialReceptor":"ASICS CHILE SPA","correoReceptor":"braulio@febos.io","iva":13586.0,"montoTotal":85089.0,"estadoSii":4.0,"estadoComercial":7.0,"fechaRecepcion":"2020-04-02","fechaRecepcionSii":"2020-04-02","tipo":3.0,"medio":"","trackId":4.495304226E9,"tpoTraVenta":1.0,"lugar":"","comentario":"","plazo":-18.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"P","diasParaPago":4.0},{"febosId":"fe38cbe32b53424cd3280ae2cf425041e1e9","tipoDocumento":33.0,"folio":1212.0,"fechaEmision":"2020-04-02","formaDePago":2.0,"fechaVencimiento":"2020-05-02","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"77252110-3","razonSocialReceptor":"BUCKMAN LABORATORIOS CHILE LIMITADA","correoReceptor":"77252110-3@prd.inbox.febos.cl","iva":27171.0,"montoTotal":170177.0,"estadoSii":4.0,"estadoComercial":0.0,"fechaRecepcion":"2020-04-02","fechaRecepcionSii":"2020-04-02","tipo":3.0,"medio":"","trackId":4.495304232E9,"tpoTraVenta":1.0,"lugar":"","comentario":"","plazo":-18.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"P","diasParaPago":4.0},{"febosId":"86a8756f260f524e8b2a0cc2bfd38dbe9459","tipoDocumento":33.0,"folio":1211.0,"fechaEmision":"2020-04-02","formaDePago":2.0,"fechaVencimiento":"2020-05-02","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"96813080-3","razonSocialReceptor":"INMOBILIARIA E INVERSIONES SCHIAPPACASSE SPA","correoReceptor":"96813080-3@prd.inbox.febos.cl","iva":38040.0,"montoTotal":238248.0,"estadoSii":4.0,"estadoComercial":0.0,"fechaRecepcion":"2020-04-02","fechaRecepcionSii":"2020-04-02","tipo":3.0,"medio":"","trackId":4.495304266E9,"tpoTraVenta":1.0,"lugar":"","comentario":"","plazo":-18.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"P","diasParaPago":4.0},{"febosId":"7fc6bb072a593240de2a9b1214619196bea6","tipoDocumento":33.0,"folio":1210.0,"fechaEmision":"2020-04-02","formaDePago":2.0,"fechaVencimiento":"2020-05-02","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"65044735-2","razonSocialReceptor":"CORPORACION EDUCACIONAL DE LA SOCIEDAD NACIONAL DE AGRICULTURA FG","correoReceptor":"65044735-2@febos.cl","iva":86947.0,"montoTotal":544565.0,"estadoSii":4.0,"estadoComercial":0.0,"fechaRecepcion":"2020-04-02","fechaRecepcionSii":"2020-04-02","tipo":0.0,"trackId":4.495304266E9,"tpoTraVenta":1.0,"plazo":-18.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"V","diasParaPago":4.0},{"febosId":"f7be79dc23c7224dc728c332bfd2a02803d3","tipoDocumento":33.0,"folio":1209.0,"fechaEmision":"2020-04-02","formaDePago":2.0,"fechaVencimiento":"2020-05-02","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"76184649-3","razonSocialReceptor":"COMERCIAL IMB SPA","contacto":"226678083","correoReceptor":"76184649-3@prd.inbox.febos.cl","iva":27171.0,"montoTotal":170177.0,"estadoSii":4.0,"estadoComercial":0.0,"fechaRecepcion":"2020-04-02","fechaRecepcionSii":"2020-04-02","tipo":3.0,"medio":"","trackId":4.495304258E9,"tpoTraVenta":1.0,"lugar":"","comentario":"","plazo":-18.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"P","diasParaPago":4.0},{"febosId":"c6439cc12819f24b432aec12c353763351f8","tipoDocumento":33.0,"folio":1208.0,"fechaEmision":"2020-04-02","formaDePago":2.0,"fechaVencimiento":"2020-05-02","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"76481337-5","razonSocialReceptor":"AGRICOLA AG II LIMITADA","contacto":"996242525","correoReceptor":"76481337-5@prd.inbox.febos.cl","iva":27171.0,"montoTotal":170177.0,"estadoSii":4.0,"estadoComercial":2.0,"fechaRecepcion":"2020-04-02","fechaRecepcionSii":"2020-04-02","tipo":3.0,"medio":"","trackId":4.495304242E9,"tpoTraVenta":1.0,"lugar":"","comentario":"","plazo":-18.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"P","diasParaPago":4.0},{"febosId":"6d3ee8a42bc1024023288d124e615be4061b","tipoDocumento":33.0,"folio":1207.0,"fechaEmision":"2020-04-02","formaDePago":2.0,"fechaVencimiento":"2020-05-02","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"76608232-7","razonSocialReceptor":"SOINDUS CONSULTING LIMITADA","iva":108684.0,"montoTotal":680707.0,"estadoSii":4.0,"estadoComercial":7.0,"fechaRecepcion":"2020-04-02","fechaRecepcionSii":"2020-04-02","tipo":0.0,"trackId":4.495306196E9,"tpoTraVenta":1.0,"plazo":-18.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"V","diasParaPago":4.0},{"febosId":"7899332c23a932445a294e222d86f66d51e2","tipoDocumento":33.0,"folio":1206.0,"fechaEmision":"2020-04-02","formaDePago":2.0,"fechaVencimiento":"2020-05-02","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"76419784-4","razonSocialReceptor":"AGROTOP SERVICIOS SPA","correoReceptor":"76419784-4@prd.inbox.febos.cl","iva":21737.0,"montoTotal":136142.0,"estadoSii":4.0,"estadoComercial":0.0,"fechaRecepcion":"2020-04-02","fechaRecepcionSii":"2020-04-02","tipo":0.0,"trackId":4.495304236E9,"tpoTraVenta":1.0,"plazo":-18.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"V","diasParaPago":4.0},{"febosId":"a04c1ae42b12424e1e28a2f2dfe17c504b1d","tipoDocumento":33.0,"folio":1205.0,"fechaEmision":"2020-04-02","formaDePago":2.0,"fechaVencimiento":"2020-05-02","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"76416631-0","razonSocialReceptor":"AGROTOP ACEITES SPA","correoReceptor":"76416631-0@prd.inbox.febos.cl","iva":5434.0,"montoTotal":34035.0,"estadoSii":4.0,"estadoComercial":0.0,"fechaRecepcion":"2020-04-02","fechaRecepcionSii":"2020-04-02","tipo":0.0,"trackId":4.495304256E9,"tpoTraVenta":1.0,"plazo":-18.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"V","diasParaPago":4.0},{"febosId":"c31422cb2291f2404529b5d20007ad13a3d0","tipoDocumento":33.0,"folio":1204.0,"fechaEmision":"2020-04-02","formaDePago":2.0,"fechaVencimiento":"2020-05-02","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"76035224-1","razonSocialReceptor":"AVENATOP S.A.","correoReceptor":"76035224-1@prd.inbox.febos.cl","iva":21737.0,"montoTotal":136142.0,"estadoSii":4.0,"estadoComercial":7.0,"fechaRecepcion":"2020-04-02","fechaRecepcionSii":"2020-04-02","tipo":3.0,"medio":"","trackId":4.495304238E9,"tpoTraVenta":1.0,"lugar":"","comentario":"","plazo":-18.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"P","diasParaPago":4.0},{"febosId":"ae2e0f652a3f424c7c2b20d2c66b01c9e6a9","tipoDocumento":33.0,"folio":1203.0,"fechaEmision":"2020-04-02","formaDePago":2.0,"fechaVencimiento":"2020-05-02","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"76174723-1","razonSocialReceptor":"INDUSTRIAL COMMODITIES INTERNATIONAL CHILE S.A","correoReceptor":"76174723-1@prd.inbox.febos.cl","iva":5434.0,"montoTotal":34035.0,"estadoSii":4.0,"estadoComercial":0.0,"fechaRecepcion":"2020-04-02","fechaRecepcionSii":"2020-04-02","tipo":3.0,"medio":"","trackId":4.495304238E9,"tpoTraVenta":1.0,"lugar":"","comentario":"","plazo":-18.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"P","diasParaPago":4.0},{"febosId":"d0cff0ff2802c24d252901225202ac3dc7fc","tipoDocumento":33.0,"folio":1202.0,"fechaEmision":"2020-04-02","formaDePago":2.0,"fechaVencimiento":"2020-05-02","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"99508830-4","razonSocialReceptor":"GRANOTOP S A","correoReceptor":"99508830-4@prd.inbox.febos.cl","iva":10868.0,"montoTotal":68070.0,"estadoSii":4.0,"estadoComercial":0.0,"fechaRecepcion":"2020-04-02","fechaRecepcionSii":"2020-04-02","tipo":3.0,"medio":"","trackId":4.49530424E9,"tpoTraVenta":1.0,"lugar":"","comentario":"","plazo":-18.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"P","diasParaPago":4.0},{"febosId":"97e775f82f650244592a55622feac1b1a215","tipoDocumento":33.0,"folio":1201.0,"fechaEmision":"2020-04-02","formaDePago":2.0,"fechaVencimiento":"2020-05-02","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"96938990-8","razonSocialReceptor":"SAPROSEM S A","correoReceptor":"96938990-8@prd.inbox.febos.cl","iva":21737.0,"montoTotal":136142.0,"estadoSii":4.0,"estadoComercial":0.0,"fechaRecepcion":"2020-04-02","fechaRecepcionSii":"2020-04-02","tipo":3.0,"medio":"","trackId":4.495260128E9,"tpoTraVenta":1.0,"lugar":"","comentario":"","plazo":-18.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"P","diasParaPago":4.0},{"febosId":"aede7cbc26f86249312be1d2c5c89e520303","tipoDocumento":33.0,"folio":1200.0,"fechaEmision":"2020-04-02","formaDePago":2.0,"fechaVencimiento":"2020-05-02","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"79768170-9","razonSocialReceptor":"SOQUIMICH COMERCIAL S A","correoReceptor":"79768170-9@prd.inbox.febos.cl","iva":232369.0,"montoTotal":1455365.0,"estadoSii":5.0,"estadoComercial":7.0,"fechaRecepcion":"2020-04-02","fechaRecepcionSii":"2020-04-02","tipo":2.0,"trackId":4.49525319E9,"tpoTraVenta":1.0,"fechaReciboMercaderia":"2020-04-07","plazo":-18.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"V","diasParaPago":4.0},{"febosId":"62c35293263d224e272b75b22914eaf35813","tipoDocumento":33.0,"folio":1199.0,"fechaEmision":"2020-04-02","formaDePago":2.0,"fechaVencimiento":"2020-05-02","rutEmisor":"76179952-5","razonSocialEmisor":"FEBOS S.A.","rutReceptor":"76398272-6","razonSocialReceptor":"CONTACTA2 SERVICIOS DE MARKETING SPA","contacto":"12345678","correoReceptor":"76398272-6@prd.inbox.febos.cl","iva":108684.0,"montoTotal":680707.0,"estadoSii":4.0,"estadoComercial":0.0,"fechaRecepcion":"2020-04-02","fechaRecepcionSii":"2020-04-02","tipo":0.0,"trackId":4.495250784E9,"tpoTraVenta":1.0,"plazo":-18.0,"tieneNc":"no","tieneNd":"no","tieneAptobacionActiva":"no","estadoPagado":"V","diasParaPago":4.0}],"duracion":376,"hora":"2020-04-28 17:56:12.872","codigo":10,"seguimientoId":"74424a46-d009-49d0-8dc2-d357764a671e","mensaje":"Acción realizada satisfactoriamente"},
        config: configVistas[this.$route.params.categoria][this.$route.params.vista],
        componentes: {},
        documentosSeleccionados: [],
        paginaActual:1,
        totalPaginas:2,
        filtros:{}
      }

    },
    watch:{
      paginaActual(nuevoValor){
        this.cargarDocumentos(nuevoValor);
      }
    },
    computed:{
      categoria(){
        return this.$route.params.categoria;
      },
      vista(){
        return this.$route.params.vista;
      },
      documentos() {
        return this.respuestaApiSimulada.documentos;
      },
      campos() {
        let campos = [];
        var self = this;
        this.config.campos.forEach(function (obj) {
          campos.push(self.obtenerCampoTabla(obj));
        });
        return campos;
      }
    },
    methods:{
      cargarComponenteCampo(nombreCampo) {
        if (!this.componentes[nombreCampo]) {
          this.componentes[nombreCampo] = () => import(`@/febos/chile/dte/componentes/campos/Campo${nombreCampo}.vue`);
        }
        return this.componentes[nombreCampo];
      },
      cargarDocumentos(pagina){
        console.log(pagina);
      }
    },
    mounted() {
      console.log(configVistas);
      console.log(this.config);
    }

  }
</script>
<style lang="css">
  table {
    border-spacing: 0;
    width: 100%;
  }
  .selector {
    width: 10px;
    padding-left: 2px;
    padding-right: 0px;
  }
  th.selector > div > span.checkbox_x.vs-checkbox{
    border: 2px solid #ffffff!important;
  }

  tr th {
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: center;
    font-size: 100%;
    background-color: rgba(var(--vs-primary), 1);
    color: white;
  }

  th, td {
    padding: 0.5em 1em;
    border-top: 1px solid rgba(var(--vs-primary), 1);;
  }

  tr:last-child td {
    border-bottom: 1px solid rgba(var(--vs-primary), 1);;
  }

  th:first-child, td:first-child {
    border-left: 1px solid rgba(var(--vs-primary), 1);;
  }

  th:last-child, td:last-child {
    border-right: 1px solid rgba(var(--vs-primary), 1);
  }

  thead tr:first-child th:first-child {
    border-radius: 0.6em 0 0 0;
  }

  thead tr:first-child th:last-child {
    border-radius: 0 0.6em 0 0;
  }

  tbody tr:last-child td:first-child {
    border-radius: 0 0 0 0.6em;
  }

  tbody tr:last-child td:last-child {
    border-radius: 0 0 0.6em 0;
  }

  .acciones{
    cursor:pointer;
  }
</style>
