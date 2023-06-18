import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import React, {useState, useEffect} from 'react';

const DetailScreen = ({route}) => {
  const {data} = route.params;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.card}>
        <View>
          <Image style={styles.imgStyle} source={{uri: data[0].picture}} />
        </View>

        <View>
          <View>
            <Text style={styles.bioData}> </Text>
          </View>

          <View style={styles.mainContain}>
            <Text style={styles.myName}>
              {' '}
              Name: {data[0].firstname} {data[0].surname}
            </Text>
            <Text style={styles.myName}> email: {data[0].email} </Text>
            <Text style={styles.myName}> Gender: {data[0].gender} </Text>
            <Text style={styles.myName}> mobile: {data[0].phone} </Text>
            <Text style={styles.myName}> company name:{data[0].company} </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#ebedee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 350,
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bioData: {
    fontSize: 30,
    color: '#fff',
  },
  mainHeader: {
    fontSize: 30,
    color: '#a18ce5',
    textAlign: 'center',
  },
  imgStyle: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  mainContain: {
    padding: 10,
    backgroundColor: '#353535',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  myName: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
    alignSelf: 'flex-start',
    textTransform: 'capitalize',
  },
});

export default DetailScreen;
