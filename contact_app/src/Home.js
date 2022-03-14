import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Image } from 'react-native';
import { BorderlessButton, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { instance } from './request';
import Icon from '../assets/favicon.png';

const Home = (props) => {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const msg = props.route?.params?.msg;
  
  useEffect(() => {
    instance.get('contacts').then((response) => {
      setData(response.data);
    }).catch((err) => console.log("ERROR: ", err));
  }, [props.route]);

  const changeText = (k) => {
    setSearch(k);
    if (k.length > 0) {
      instance.get('search/' + k).then((response) => {
        setData(response.data);
      }).catch((err) => console.log(err));
    } else {
      instance.get('contacts').then((response) => {
        setData(response.data);
      }).catch((err) => console.log(err));
    }
  }

  const sortData = () => {
    instance.get('sort/first_name').then((response) => {
      setData(response.data);
    }).catch((err) => console.log(err));
  }

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback key={item.id} onPress={() => props.navigation.navigate("EditContact", {data: item})} style={styles.contactContainer}>
      <View>
        <Image style={styles.contactImage} source={Icon} />
      </View>
      <View style={{marginLeft: 10}}>
        <Text style={styles.name}>{ item.first_name + " " + item.last_name}</Text>
        <Text style={styles.text}>{ item.phone }</Text>
        <Text style={styles.text}>{ item.email}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <TextInput style={styles.search} onChangeText={changeText} value={search} placeholder='search' />
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <BorderlessButton onPress={() => props.navigation.navigate("AddContact")}><Text style={{color: 'blue'}}>Add New Contact</Text></BorderlessButton>
        <BorderlessButton onPress={sortData}><Text style={{color: 'blue'}}>Filter: Name</Text></BorderlessButton>
      </View>
      {msg && <Text style={styles.msg}>{msg}</Text>}
      <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.id} />
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
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: "5%",
    marginVertical: 10,
  },
  contactContainer: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
  },
  msg: {
    margin: 10,
    backgroundColor: "green",
    color: "white",
    padding: 10,
    borderRadius: 10,
  }
});

export default Home;
