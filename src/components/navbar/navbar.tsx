import React from 'react';
import {Pressable, Text, View} from 'react-native';

import styles from './navbar.styles';

import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import colors from '../../util/styles/colors';

import {Screens} from '../../data/navigation';
import {useNavigation, Link} from '@react-navigation/native';

interface NavbarIconProps {
  ionic?: boolean;
  name: string;
  text: string;
  to: string;
}
const NavbarIcon: React.FC<NavbarIconProps> = ({ionic = false, name, text, to}) => (
  <Link to={'/' + to}>
    <View style={styles.iconWrapper}>
      {ionic ?
        <IonIcon name={name} style={styles.icon} size={26} color={colors.black} />
        :<Icon name={name} style={styles.icon} size={26} color={colors.black} />
      }
      <Text style={styles.iconText}>{text}</Text>
    </View>
  </Link>
);

const Navbar: React.FC = () => {
  return (
    <View style={styles.container}>
      <NavbarIcon name="history" text="History" to={Screens.Landing} />
      <NavbarIcon name="user" text="Profile" to={Screens.Landing} />
      <NavbarIcon name="plus" text="Start" to={Screens.Landing} />
      <NavbarIcon name="bar-chart" text="Chart" to={Screens.NewWorkout} />
      <NavbarIcon name="md-barbell" text="Exercises" to={Screens.NewWorkout} ionic/>
    </View>
  );
};

export default Navbar;
