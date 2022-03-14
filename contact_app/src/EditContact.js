import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import Icon from '../assets/favicon.png';
import { instance } from './request';

const EditContact = ({navigation, route}) => {

  const [data, setData] = useState(route.params.data);

  const updateData = () => {
    const sendData = { ...data };
    instance.put('contacts/'+sendData.id, sendData).then((response) => {
      navigation.navigate("Home", {msg: response.data});
    }).catch((err) => console.log(err));
  }

  const deleteData = () => {
    console.log("delete: ", data.id);
    instance.delete('contacts/'+data.id).then((response) => {
      navigation.navigate("Home", {msg: response.data});
    }).catch((err) => console.log(err));
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={Icon} style={{width: 100, height: 100, margin: 10}} />
      </View>
      <Text style={{fontSize: 20, fontWeight: "700", marginVertical: 10}}>{ data.first_name + " " + data.last_name }</Text>
      <View style={{ width: "90%", marginHorizontal: "5%" }}>
        <Text>Phone: </Text>
        <TextInput style={styles.search} keyboardType="numeric" placeholder='6476769653' onChangeText={k => setData({...data, phone: k})} value={data?.phone + ""} />
      </View>
      <View style={{ width: "90%", marginHorizontal: "5%" }}>
        <Text>Email: </Text>
        <TextInput style={styles.search} keyboardType="email-address" placeholder='test@test.com' onChangeText={k => setData({...data, email: k})} value={data?.email} />
      </View>
      <View style={{ width: "50%", marginBottom: 10 }}>
        <Button title='Update Contact' color="blue" onPress={updateData} />
      </View>
      <View style={{ width: "50%" }}>
        <Button title='Delete Contact' color="red" onPress={deleteData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center"
  },
  search: {
    borderColor: '#ccc',
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
});

export default EditContact;
