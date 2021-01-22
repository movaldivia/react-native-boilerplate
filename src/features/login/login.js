import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image
} from 'react-native';
import {rutParser} from '../../helpers/rut';
import {useDispatch} from 'react-redux';
import {fetchUserThunk, fetchInfoThunk} from './loginSlice';

const Login = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    const parsed_rut = rut.split('-')[0].replace(/\./gi, '');
    dispatch(fetchUserThunk({rut: parsed_rut, password})).then((res) => {
      dispatch(
        fetchInfoThunk({
          id: res.payload.id,
          access: res.payload.access,
          refresh: res.payload.refresh,
        }),
      );
    });
  };

  const handleChange = (rut) => {
    let parsedRut = rutParser(rut.replace(/[^0-9.]/g, ''));
    setRut(parsedRut);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#67cfe2',
    },
    titleText:{
      fontFamily: 'Baskerville',
      fontSize: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#0a99b3',
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 25,
      marginBottom: 10,
    },
    buttonText: {
      fontFamily: 'Baskerville',
      fontSize: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      width: 200,
      fontFamily: 'Baskerville',
      fontSize: 20,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'white',
      marginVertical: 10,
    },
  });
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/img/logo-glik.png')} />
      <TextInput
        value={rut}
        onChangeText={(text) => handleChange(text)}
        placeholder="rut"
        placeholderTextColor="white"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder={'password'}
        secureTextEntry={true}
        placeholderTextColor="white"
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text>LOG IN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
