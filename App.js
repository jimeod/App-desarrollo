import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert
} from 'react-native';

export default function App() {

  // Estado de navegacion
  const [pantallaActual, setPantallaActual] = useState('registro');

  // Estados de Formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');

  // Funcion validacion y registro
  const validarYRegistrar = () => {

    if (!nombre.trim() || !correo.trim() || !telefono.trim() || !password.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (telefono.length !== 10) {
      Alert.alert('Error', 'El número de teléfono debe tener 10 dígitos');
      return;
    }

    if (!correo.includes('@') || !correo.includes('.')) {
      Alert.alert('Error', 'El correo electrónico no es válido');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    Alert.alert(
      'Registro exitoso',
      `Hola ${nombre}, tu cuenta ha sido creada.`,
      [
        {
          text: 'Continuar',
          onPress: () => setPantallaActual('bienvenida')
        }
      ]
    );
  };

  const iniciarNuevoRegistro = () => {
    setNombre('');
    setCorreo('');
    setTelefono('');
    setPassword('');
    setPantallaActual('registro');
  };

  if (pantallaActual === 'bienvenida') {
    return (
      <View style={styles.contenedorCentrado}>

        <Text style={styles.tituloPrincipal}>
          ¡Bienvenido, {nombre}!
        </Text>

        <Text style={styles.subtitulo}>
          Tu registro se completó correctamente.
        </Text>

        <View style={styles.botonEspaciado}>
          <Button
            title="Nuevo Registro"
            onPress={iniciarNuevoRegistro}
            color="#28a745"
          />
        </View>

      </View>
    );
  }

  return (
    <View style={styles.contenedor}>

      <Text style={styles.tituloPrincipal}>
        Crear Cuenta
      </Text>

      {/* Campo: Nombre */}
      <Text style={styles.etiqueta}>
        Nombre completo:
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ej. Juan Pérez"
        value={nombre}
        onChangeText={setNombre}
      />

      {/* Campo: Teléfono */}
      <Text style={styles.etiqueta}>
        Teléfono celular:
      </Text>

      <TextInput
        style={styles.input}
        placeholder="10 dígitos"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
        maxLength={10}
      />

      {/* Campo: Correo */}
      <Text style={styles.etiqueta}>
        Correo electrónico:
      </Text>

      <TextInput
        style={styles.input}
        placeholder="usuario@ejemplo.com"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo: Contraseña */}
      <Text style={styles.etiqueta}>
        Contraseña:
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Mínimo 6 caracteres"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      {/* Botón de envío */}
      <View style={styles.botonEspaciado}>
        <Button
          title="Registrarme"
          onPress={validarYRegistrar}
          color="#005691"
        />
      </View>

    </View>
  );
}

// ESTILOS BONITOS Y LIMPIOS
const styles = StyleSheet.create({

  contenedor: {
    flex: 1,
    backgroundColor: '#f4f7f6',
    paddingTop: 70,
    paddingHorizontal: 25,
  },

  contenedorCentrado: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  tituloPrincipal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 30,
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },

  etiqueta: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444444',
    marginBottom: 5,
  },

  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
    fontSize: 16,
  },

  botonEspaciado: {
    marginTop: 15,
  }

});