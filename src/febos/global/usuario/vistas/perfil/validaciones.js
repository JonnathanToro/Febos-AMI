var dict={
  custom: {
    nombre: {
      required: 'Debes ingresar un nombre.',
      min: "Un nombre tan corto? (Minimo 5 caracteres).",
      max: "Un nombre tal largo? (Maximo 50 caracteres)."
    },
    iut: {
      required: 'Debes ingresar tu Identificacion.',
    },
    alias: {
      required: 'Debes ingresar un Alias.',
      min: 'Un alias tan corto? (Minimo 3 caracteres).',
      max: 'Un alias tan largo? (MAximo 50 caracteres).',
      attributes: {
        email: 'El correo no es valido.'
      }
    },
    correo: {
      required: 'Debes ingresar un correo electronico.',
      email: "No es un correo electrónico válido",
      min: 'Un correo tan corto? (Minimo 10 caracteres).',
      max: 'Un correo tan largo? (Maximo 150 caracteres).'
    },
    claveActual: {
      required: 'Debes ingresar una contraseña',
      min: "Una contraseña tan corta?",
      max: "Una contraseña tan larga?"
    },
    nuevaClave: {
      required: 'Debes ingresar una contraseña',
      min: "Una contraseña tan corta?",
      max: "Una contraseña tan larga?"
    },
    reNuevaClave: {
      required: 'Debes ingresar una contraseña',
      min: "Una contraseña tan corta?",
      max: "Una contraseña tan larga?",
      confirmed: 'No coincide con la nueva clave!'
    },
  }
}
;
export default dict;
