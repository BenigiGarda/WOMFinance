/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
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

interface totalAccount {
  email: string;
  password: string;
}
function Login({navigation}: any) {
  const [totalAccount, setTotalAccount] = useState<any>([]);
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [triggerSecure, setTriggerSecure] = useState<boolean>(true);
  const regexEmail: RegExp =
    /^([a-zA-Z0-9._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;
  const regexPassword: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  useEffect(() => {
    async function getData() {
      let data: any = await AsyncStorage.getItem('Account');
      let value = JSON.parse(data);
      setTotalAccount(value);
    }
    getData();
  }, []);
  console.log(totalAccount);

  const login = async () => {
    let index = totalAccount.findIndex(
      (e: totalAccount) => e.email === emailValue,
    );
    if (emailValue === '') {
      Alert.alert('Email Validation', 'Email tidak boleh kosong');
    } else if (regexEmail.test(emailValue) === false) {
      Alert.alert('Email Validation', 'Email tidak valid');
    } else if (passwordValue === '') {
      Alert.alert('Password Validation', 'Password tidak boleh kosong');
    } else if (regexPassword.test(passwordValue) === false) {
      Alert.alert(
        'Password Validation',
        'Inputan password harus lebih dari 8 karakter mengandung huruf besar, kecil dan angka',
      );
    } else {
      if (index !== -1) {
        if (totalAccount[index].password === passwordValue) {
          let data = {
            email: emailValue,
            password: passwordValue,
          };
          await AsyncStorage.setItem('CurrentAccount', JSON.stringify(data));
          navigation.reset({
            routes: [{name: 'Home'}],
          });
          console.log('Login Berhasil');
        } else {
          Alert.alert('Login Failed', 'Email/Password Salah');
        }
      } else {
        Alert.alert('Login Failed', 'Email/Password Salah');
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
            value={emailValue}
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
            value={passwordValue}
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
            onPress={() => login()}
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
              LOGIN
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
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
          Sign Up Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
