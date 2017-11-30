export default {
  panicButton: {
    text: '¡NECESITO AYUDA!'
  },
  label: {
    confirm: 'Aceptar',
    cancel: 'Cancelar'
  },
  enum: {
    gender: {
      male: 'Masculino',
      female: 'Femenino',
      other: 'Otro',
      unspecified: 'Prefiero no decir'
    }
  },
  screens: {
    signIn: {
      title: 'Bienvenido',
      description:
        'Aca iría una descripción breve del problema que plantea solucionar Temis ' +
        'con una intro que no tenga muchas líneas.',
      instructions:
        'Para continuar, debemos vincular tu cuenta de Facebook ' +
        'para poder postear en tu nombre en caso que tengas una emergencia. ' +
        'Lo que escribas en Temis podrá ser siempre anónimo si así lo deseas y ' +
        'sólo capturaremos tu sexo y edad con fines estadísticos.',
      button: 'Continúa con Facebook'
    },
    profile: {
      title: 'Completá tu registro',
      label: {
        name: 'Tu nombre y apellido',
        birthday: 'Por favor indicá tu fecha de nacimiento',
        gender: 'Seleccioná con qué sexo te identificás',
        anon: 'Deseo pubilicar anónimamente'
      },
      description:
        'Podés elegir publicar y comentar anónimamente ' +
        'por defecto en la aplicación. Luego podrás cambiarlo en tus ' +
        'preferencias. Cada vez que crees un reporte nuevo, te daremos ' +
        'la opción de hacerlo anónimamente o utilizando tus datos reales.',
      button: 'Finalizar registro'
    },
    help: {
      title: '¡Ayuda!',
      instructions:
        'Al apretar este botón, lanzaremos una alerta a todos ' +
        'tus contactos con tu ubicación en vivo y lo postearemos ' +
        'en tus redes sociales. Podrás terminar la alerta en ' +
        'cualquier momento y luego completar un reporte contándonos ' +
        'que es lo que te sucedió.',
      reportNote: 'Si querés contarnos algo que ya te sucedió…',
      reportButton: 'PUBLICÁ QUE EXPERIENCIA VIVISTE'
    },
    reports: {
      title: 'Reportes'
    },
    insights: {
      title: 'Visualizar'
    },
    alerts: {
      title: 'Alertas'
    },
    settings: {
      title: 'Ajustes'
    }
  }
}
