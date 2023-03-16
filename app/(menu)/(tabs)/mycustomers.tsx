import {StyleSheet, Text,FlatList, TouchableOpacity, View,Image} from 'react-native';
import React from 'react'
const custdata=
[
{
  name:"pratham",
  dues:122,
  area:'faridabad'
},
{
  name:"sushmit",
  dues:100,
  area:'jhunjunu'
},
{
  name:"ranjan",
  dues:12210,
  area:'bhuna'
},
{
  name:"pratham",
  dues:122,
  area:'faridabad'
},
{
  name:"sushmit",
  dues:100,
  area:'jhunjunu'
},
{
  name:"ranjan",
  dues:12210,
  area:'bhuna'
},
]
function MyCustomer(){
  return (
    <FlatList
        data={custdata}
        renderItem={({item}) =><Customer data={item}/>}
        keyExtractor={(item,i) => i}
      />
  )
}

function Customer(prop){
  return (
    <TouchableOpacity style={styles.container} onPress={()=>{alert(prop.data.name)}}>
        <View>
          <Text style={styles.text1}>{prop.data.name}</Text>
          <View style={styles.dues}>
            <Text style={styles.text2}>Dues</Text>
            <Text style={styles.text3}>{prop.data.dues}</Text>
          </View>
          <View style={styles.area}>
            <Text style={styles.text2}>Area</Text>
            <Text style={styles.text3}>{prop.data.area}</Text>
          </View>
        </View>
        <View>
          <Image style={styles.image} source={require('../../../assets/images/man.png')}/>
        </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  
  container: {
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    margin:10,
    backgroundColor: 'white',
    borderRadius:10,
    padding: 10,
    elevation: 20,
    shadowColor: '#52006A'
  },
  text1:{
    margin:5,
    fontSize:20,
    fontWeight:"900",
    color:"black"
  },
  text2:{
    marginLeft:5,
    margin:5,
    fontSize:15,
    fontWeight:"700",
    color:"grey"
  },
  text3:{
    marginLeft:5,
    margin:5,
    fontSize:15,
    fontWeight:"700",
    color:"black"
  },
  dues:{
    flex:1,
    flexDirection:"row"
  },
  area:{
    flex:1,
    flexDirection:"row"
  },
  image:{
    margin:5,
    width:90,
    height:90
  }
});
export default MyCustomer