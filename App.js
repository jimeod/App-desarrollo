import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";

export default function App() {

  const [pantallaActual, setPantallaActual] = useState('registro');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [empleado, setEmpleado] = useState([]);

  const [cargando, setCargando] = useState(true);

  const descargarEmpleados = async () => {
    try {
      const respuesta = await fetch(
        'https://randomuser.me/api/?results=5'
      );

      const datos = await respuesta.json();

      const empleadosAdaptados = datos.results.map((usuario) => ({
        id: Date.now().toString() + Math.random().toString(),
        nombre: `${usuario.name.first} ${usuario.name.last}`,
        correo: usuario.email,
        telefono: usuario.phone,
        imagen: usuario.picture.large
      }));

      setEmpleado(empleadosAdaptados);
      setCargando(false);

    } catch (error) {
      console.error('Error al descargar empleados:', error);
      setCargando(false);
    }
  };

  useEffect(() => {
    descargarEmpleados();
  }, []);

  // Funcion validacion de empleado
  const agregarEmpleadoManual = () => {

    if (!nombre.trim() || !correo.trim() || !telefono.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (!correo.includes('@') || !correo.includes('.')) {
      Alert.alert('Error', 'El correo electronico no es valido');
      return;
    }

    if (telefono.length !== 10) {
      Alert.alert('Error', 'El numero de telefono debe tener 10 digitos');
      return;
    }

    // Imagenes dinamicas
    const NuevoEmpleado = {
      id: Date.now().toString(),
      nombre: nombre,
      correo: correo,
      telefono: telefono,
      imagen: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`
    };

    setEmpleado([NuevoEmpleado, ...empleado]);

    Alert.alert('Exito', 'Empleado registrado correctamente');

    setNombre('');
    setCorreo('');
    setTelefono('');
  };

  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" />
        <Text>Cargando empleados...</Text>
      </View>
    );
  }

  if (pantallaActual === 'lista') {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Lista de Empleados</Text>

        <Button
          title="Ir a Registro"
          onPress={() => setPantallaActual('registro')}
        />

        <FlatList
          data={empleado}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tarjeta}>
              <Image
                source={{ uri: item.imagen }}
                style={styles.imagen}
              />

              <View>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text>Correo: {item.correo}</Text>
                <Text>Teléfono: {item.telefono}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }

  return(
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Nuevo Ingreso</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefono"
        keyboardType="numeric"
        maxLength={10}
        value={telefono}
        onChangeText={setTelefono}
      />

      <Button
        title="Registrar Empleado"
        color="green"
        onPress={agregarEmpleadoManual}
      />
      <View style={styles.espacio}/>

      <Button
        title="ver lista de  Empleados"
        color="blue"
        onPress={()=> setPantallaActual('lista')}
      />



    </View>
  );





};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f4f7f6',
    paddingTop: 60,
    paddingHorizontal: 20
  },
  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 15
  },
  espacio: {
    marginBottom: 15
  },
  tarjeta: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  imagen: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222'
  }
});