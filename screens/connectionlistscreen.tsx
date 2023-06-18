import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import filter from 'lodash.filter';
import {useNavigation} from '@react-navigation/native';

const API_ENDPOINT =
  'https://run.mocky.io/v3/0bff210c-7fc8-4964-a555-8d93de3d5f17';

const Connectionlistscreen = () => {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState<any>(null);
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchData(API_ENDPOINT);
  }, []);

  const fetchData = async (url: RequestInfo) => {
    try {
      const response = await fetch(url);
      const userData = await response.json();
      setData(userData);
      //console.log(userData);
      setFullData(userData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(
      fullData,
      (user: {firstname: any; surname: any; email: any}) => {
        return contains(user, formattedQuery);
      },
    );
    setData(filteredData);
    console.log(filteredData);
  };

  const contains = ({firstname, surname, email}: any, query: string) => {
    if (
      firstname.includes(query) ||
      surname.includes(query) ||
      email.includes(query)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handlePress = () => {
    console.log(data);
    if (data.length == 1) {
      navigation.navigate('Detail', {data: data});
    }
  };

  if (isLoading) {
    return (
      <View style={styles.LoaderStyle}>
        <ActivityIndicator size={'large'} color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.LoaderStyle}>
        <Text>
          {' '}
          Error in fetching data... Please check your internet connection
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        style={styles.inputbar}
        autoCapitalize="none"
        value={searchQuery}
        onChangeText={query => handleSearch(query)}
      />
      <FlatList
        data={data}
        keyExtractor={item => item.index}
        renderItem={({item}) => (
          <TouchableOpacity onPress={handlePress}>
            <View style={styles.itemContainer}>
              <Image source={{uri: item.picture}} style={styles.image} />
              <View>
                <Text style={styles.textName}>
                  {item.firstname} {item.surname}
                </Text>
                <Text style={styles.textEmail}>{item.email}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  inputbar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  LoaderStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textName: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: '600',
  },
  textEmail: {
    fontSize: 14,
    marginLeft: 10,
    color: 'grey',
  },
});

export default Connectionlistscreen;
