import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Box, Button, Input, Icon, Pressable, Row, Text} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import Spacer from '../../components/spacer';
import {RootStackParamList} from '../../constants/navigation';
import {colors} from '../../util/styles';

type Props = NativeStackScreenProps<RootStackParamList, any>;

const Friends: React.FC<Props> = ({navigation}) => {
  const [friendSearch, setFriendSearch] = useState('');

  const onFindFriend = () => {
    navigation.navigate('friend_search', {filter: friendSearch});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Row mx={2} height={10}>
        <Input
          borderBottomLeftRadius={8}
          borderTopLeftRadius={8}
          onChangeText={setFriendSearch}
          placeholder={'Search for friends...'}
          flex={1}
          borderTopRightRadius={0}
          borderBottomRadius={0}
          value={friendSearch}
        />
        <Box
          bg="primary.500"
          borderBottomRightRadius={8}
          borderTopRightRadius={8}
          justifyContent="center"
          px={3}>
          <Pressable onPress={onFindFriend}>
            <Icon as={Ionic} color={'white'} name="search" size={6} />
          </Pressable>
        </Box>
      </Row>
      <Row mx={3} mb={4} height={65} mt={2}>
        <Button flex={1} flexDir={'row'} color={colors.primary} mr={1}>
          My Friends
        </Button>
        <Button flex={1} flexDir={'row'} color={colors.primary} ml={1}>
          We Go Jim
        </Button>
      </Row>
      <Row bg="gray.200" px={3} py={2} alignItems="center" mb={1}>
        <Text mr={'auto'} ml={2} fontWeight={600} fontSize={16}>
          @hermano
        </Text>
        <Icon as={Ionic} name="person-add" size={6} />
        <Icon as={Ionic} name="close-sharp" size={6} ml={2} />
      </Row>
      <Row bg="gray.200" px={3} py={2} alignItems="center" mb={1}>
        <Text mr={'auto'} ml={2} fontWeight={600} fontSize={16}>
          @josh
        </Text>
        <Icon as={Ionic} name="person-add" size={6} />
        <Icon as={Ionic} name="close-sharp" size={6} ml={2} />
      </Row>
      <Button m={2} my={1} textAlign="center">
        View Rest
      </Button>
      <Spacer size={2} />
      <Text fontSize={18} fontWeight={600} textAlign="center" mb={3}>
        Activity
      </Text>
      <Box mb={3} shadow={4}>
        <Text fontWeight={600} mb={1} ml={1}>
          @mac_demarco
        </Text>
        <Box py={2} bg="gray.200">
          <Text fontSize={16} fontWeight={600} textAlign="center" mb={1}>
            Chest & Back
          </Text>
          <Row py={1} bg="gray.300" mb={1} justifyContent="space-between">
            <Text fontWeight={500} mx={4}>
              Bench Press
            </Text>
            <Text fontWeight={500} mx={4}>
              110kg x 4
            </Text>
          </Row>
          <Row py={1} bg="gray.300" mb={1} justifyContent="space-between">
            <Text fontWeight={500} mx={4}>
              Bench Press
            </Text>
            <Text fontWeight={500} mx={4}>
              110kg x 4
            </Text>
          </Row>
          <Row py={1} bg="gray.300" mb={1} justifyContent="space-between">
            <Text fontWeight={500} mx={4}>
              Bench Press
            </Text>
            <Text fontWeight={500} mx={4}>
              110kg x 4
            </Text>
          </Row>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default Friends;
