import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC, PropsWithChildren} from 'react';
import {SafeAreaView, View} from 'react-native';
import Navbar from '../components/navbar';
import {RootStackParamList} from '../data/navigation';
import {Screens} from '../data/navigation';
import Charts from '../pages/charts';
import DetailedChartView from '../pages/charts/detailedChartView';
import History from '../pages/history';
import LandingPage from '../pages/landing';
import NewWorkout from '../pages/newWorkout';
import AppStyles from './App.styles';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: FC = () => {
  return (
    <NavigationContainer>
      <View style={AppStyles.container}>
        <SafeAreaView style={AppStyles.main}>
          <Stack.Navigator>
            <Stack.Screen
              name={Screens.Landing}
              component={LandingPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Screens.NewWorkout}
              component={NewWorkout}
              options={{
                headerTitle: 'New Workout'
              }}
            />
            <Stack.Screen
              name={Screens.History}
              component={History}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Screens.DetailedChartView}
              component={DetailedChartView}
              options={{ headerTitle: 'Detailed View'}}
            />
            <Stack.Screen
              name={Screens.Charts}
              component={Charts}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </SafeAreaView>
        <View style={AppStyles.navbar}>
          <Navbar />
        </View>
      </View>
    </NavigationContainer>
  );
};

export default App;

// import React, {type PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section: React.FC<
//   PropsWithChildren<{
//     title: string;
//   }>
// > = ({children, title}) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
