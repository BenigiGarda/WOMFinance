/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Data {
  email: string;
  password: string;
}
export default function Home({navigation}: any) {
  const [data, setData] = useState<Data>();
  const getData = async () => {
    try {
      let dataAccount = await AsyncStorage.getItem('CurrentAccount');
      let value = JSON.parse(dataAccount || '{}');
      setData(value);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#263159',
      }}>
      <View>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 40,
            fontWeight: '800',
            marginVertical: '10%',
          }}>
          Selamat Datang
        </Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#FFFFFF', fontSize: 26, fontWeight: 'bold'}}>
            EMAIL ANDA
          </Text>
          <Text style={{color: '#FFFFFF', fontSize: 24, fontWeight: 'bold'}}>
            {data?.email}
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 26,
              fontWeight: 'bold',
              marginTop: '10%',
            }}>
            PASSWORD ANDA
          </Text>
          <Text style={{color: '#FFFFFF', fontSize: 24, fontWeight: 'bold'}}>
            {data?.password}
          </Text>
        </View>
      </View>
      <View style={{width: '80%', marginTop: '10%'}}>
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem('CurrentAccount');
            navigation.reset({
              routes: [{name: 'Login'}],
            });
          }}
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
            LOGOUT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
