import {StyleSheet} from 'react-native';
import {colors} from '../../util/styles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: 32,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 2,
    textAlign: 'center',
  },
  underUsername: {
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 12,
  },
  userInfoContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  detailsContainer: {
    width: '100%',
    flexGrow: 4,
    backgroundColor: colors.primary,
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: 30,
  },
  profileItem: {
    width: '100%',
    marginBottom: 20,
  },
  profileItemText: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.white,
    marginBottom: 4,
  },
  profileItemSubText: {
    fontSize: 13,
    fontWeight: '300',
    color: colors.white,
  },
  backContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    marginVertical: 'auto',
  },
  backText: {
    color: colors.white,
    fontSize: 16,
    marginVertical: 'auto',
  },
  logOutButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 18,
  },
  logOutButton: {
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logOutIcon: {
    marginLeft: 10,
  },
});

export default styles;
