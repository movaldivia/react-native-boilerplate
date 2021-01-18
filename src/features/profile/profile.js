import React from 'react';
import { useSelector } from 'react-redux';
import { Text, View } from 'react-native';

const Profile = () => {
  const currentUser = useSelector((state) => {
    return state.auth.user;
  });
  const { first_name, last_name } = currentUser;
  return (
    <View>
      <Text>{`Hola ${first_name} ${last_name}`}</Text>
    </View>
  )
}

export default Profile;