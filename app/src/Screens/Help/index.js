import React, { Component } from 'react'
import { Text, View } from 'react-native'

import PanicButton from 'app/Components/PanicButton'
import styles from './style'

export default class Help extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PanicButton />
        <Text style={styles.buttonDesc}>
          Al apretar este botón, lanzaremos una alerta a todos tus contactos con
          tu ubicación en vivo y lo postearemos en tus redes sociales. Podrás
          terminar la alerta en cualquier momento y luego completar un reporte
          contándonos que es lo que te sucedió.
        </Text>
      </View>
    )
  }
}
