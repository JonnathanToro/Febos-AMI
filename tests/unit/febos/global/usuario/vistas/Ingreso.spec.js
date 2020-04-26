import { shallowMount } from '@vue/test-utils'
import Ingreso from "@/febos/global/usuario/vistas/Ingreso";

describe('login correcto', ()=> {
  const wrapper = shallowMount(Ingreso, {
    propsData: {
      correo: "sysadmin@febos.io",
      clave: "ia$olutunion$**",
      recordar: false,
      keyRecordar:false,
    }
  })

  it('Redirige donde correspone', () => {
    expect(1).toEqual(3)
    expect(wrapper.findAll('.active').length).toEqual(3)
  })
})
