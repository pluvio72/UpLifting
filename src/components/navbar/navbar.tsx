import React from 'react';
import { Pressable, Text, View } from 'react-native';

import styles from './navbar.styles';

import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../util/styles/colors';

import { Screens } from '../../data/navigation';
import { useNavigation, Link } from '@react-navigation/native';

interface NavbarIconProps {
  name: string,
  text: string,
  to: string,
}
const NavbarIcon: React.FC<NavbarIconProps> = ({ name, text, to }) => (
  <Link to={"/"+to}>
    <View style={styles.iconWrapper}>
      <Icon name={name} style={styles.icon} size={30} color={colors.black} />
      <Text style={styles.iconText}>{text}</Text>
    </View>
  </Link>
)

const Navbar: React.FC = () => {
  return (
    <View style={styles.container}>
      <NavbarIcon name='user' text='Profile' to={Screens.NewWorkout}/>
      <NavbarIcon name='plus' text='Start' to={Screens.NewWorkout}/>
      <NavbarIcon name='bar-chart' text='Chart' to={Screens.NewWorkout}/>
    </View>
  )
};

export default Navbar;