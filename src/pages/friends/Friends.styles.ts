import {StyleSheet} from 'react-native';
import {colors} from '../../util/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  friendSearchContainer: {
    marginHorizontal: 12,
    flexDirection: 'row',
    height: 40,
  },
  friendSearch: {
    padding: 6,
    flex: 1,
  },
  friendSearchIcon: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    padding: 4,
    paddingHorizontal: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    height: 80,
    marginHorizontal: 12,
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 14,
  },
  activity: {
    marginBottom: 12,
  },
  activityWrapper: {
    paddingVertical: 10,
    backgroundColor: colors.grey200,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
  },
  activitySet: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    marginBottom: 2,
  },
  activityText: {
    color: colors.white,
    fontWeight: '500',
    marginHorizontal: 20,
  },
  activityUser: {
    fontWeight: '600',
    marginBottom: 4,
    marginLeft: 4,
  },
  friendRequest: {
    flexDirection: 'row',
    backgroundColor: colors.grey200,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 4,
  },
  friendRequestText: {
    marginRight: 'auto',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 16,
  },
});
