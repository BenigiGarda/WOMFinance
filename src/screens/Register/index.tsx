/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Logo, IonIcons} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface dataRegister {
  email: string;
  password: string;
}
function Register({navigation}: any) {
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [triggerSecure, setTriggerSecure] = useState<boolean>(true);
  const regexEmail: RegExp =
    /^([a-zA-Z0-9._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;
  const regexPassword: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const getCurrentAccount2 = async (string: string) => {
    let account = await AsyncStorage.getItem(string);
    if (account) {
      return JSON.parse(account);
    } else {
      return [];
    }
  };

  const saveData = async () => {
    let data: dataRegister = {
      email: emailValue,
      password: passwordValue,
    };
    if (data.email === '') {
      Alert.alert('Email Validation', 'Email tidak boleh kosong');
    } else if (regexEmail.test(data.email) === false) {
      Alert.alert('Email Validation', 'Email tidak valid');
    } else if (data.password === '') {
      Alert.alert('Password Validation', 'Password tidak boleh kosong');
    } else if (regexPassword.test(data.password) === false) {
      Alert.alert(
        'Password Validation',
        'Inputan password harus lebih dari 8 karakter mengandung huruf besar, kecil dan angka',
      );
    } else {
      try {
        let existingTransactions = await getCurrentAccount2('Account');
        const updatedTransactions = [...existingTransactions, data];
        await AsyncStorage.setItem(
          'Account',
          JSON.stringify(updatedTransactions),
        );
        navigation.navigate('Login');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#263159',
      }}>
      <View style={{marginTop: '10%'}}>
        <Image source={Logo} style={{width: 300, height: 250}} />
      </View>

      <View
        style={{
          justifyContent: 'space-between',
          width: '80%',
          marginTop: '10%',
        }}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#B2B2B2',
            backgroundColor: '#FFFFFF',
            elevation: 10,
            paddingHorizontal: '3%',
          }}>
          <TextInput
            placeholder="Email"
            maxLength={50}
            defaultValue={emailValue}
            onChangeText={value => setEmailValue(value)}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#B2B2B2',
            backgroundColor: '#FFFFFF',
            elevation: 10,
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: '3%',
          }}>
          <TextInput
            placeholder="Password"
            style={{flex: 1}}
            secureTextEntry={triggerSecure}
            maxLength={50}
            defaultValue={passwordValue}
            onChangeText={value => setPasswordValue(value)}
          />
          {triggerSecure ? (
            <TouchableOpacity onPress={() => setTriggerSecure(!triggerSecure)}>
              <IonIcons name="eye-off" size={30} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setTriggerSecure(!triggerSecure)}>
              <IonIcons name="eye" size={30} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{marginTop: '10%', width: '80%'}}>
        <View>
          <TouchableOpacity
            onPress={() => saveData()}
            style={{
              backgroundColor: '#FF7000',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                padding: 16,
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              REGISTER
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10%',
        }}>
        <Text
          style={{
            padding: 16,
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '400',
          }}>
          Already Have Account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Register;
