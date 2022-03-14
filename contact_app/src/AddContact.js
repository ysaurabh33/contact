import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { instance } from './request';

const AddContact = (props) => {

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    image: ""
  });

  const addContact = () => {
    instance.post('contacts', data).then((response) => {
      props.navigation.navigate("Home", {msg: response.data});
    }).catch((err) => console.log(err));
  }

  return (
    <View style={styles.container}>
      <View style={{width: "90%", marginHorizontal: "5%"}}>
        <Text>First Name: </Text>
        <TextInput style={styles.search} placeholder='John' onChangeText={k => setData({...data, first_name: k})} value={data.first_name} />
      </View>
      <View style={{ width: "90%", marginHorizontal: "5%" }}>
        <Text>Last Name: </Text>
        <TextInput style={styles.search} placeholder='Doe' onChangeText={k => setData({...data, last_name: k})} value={data.last_name} />
      </View>
      <View style={{ width: "90%", marginHorizontal: "5%" }}>
        <Text>Phone: </Text>
        <TextInput style={styles.search} keyboardType="numeric" placeholder='6476769653' onChangeText={k => setData({...data, phone: k})} value={data.phone} />
      </View>
      <View style={{ width: "90%", marginHorizontal: "5%" }}>
        <Text>Email: </Text>
        <TextInput style={styles.search} keyboardType="email-address" placeholder='test@test.com' onChangeText={k => setData({...data, email: k})} value={data.email} />
      </View>
      <View style={{ width: "50%", marginLeft: "25%" }}>
        <Button title='Add New Contact' color="blue" onPress={addContact} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

export default AddContact;
