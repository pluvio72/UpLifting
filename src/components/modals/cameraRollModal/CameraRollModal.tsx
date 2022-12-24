import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {
  CameraRoll,
  PhotoIdentifier,
  PhotoIdentifiersPage,
} from '@react-native-camera-roll/camera-roll';
import styles from './CameraRollModal.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../util/styles';

interface Props {
  show: boolean;
  onHide: () => void;
  onSelect: (item: PhotoIdentifier['node']) => void;
  assetTypes?: 'Photos' | 'Videos' | 'All';
}

const NumberOfColumns = 4;

const CameraRollModal: React.FC<Props> = ({
  show,
  onHide,
  onSelect,
  assetTypes = 'Photos',
}) => {
  const [cameraRollItems, setCameraRollItems] =
    useState<PhotoIdentifiersPage>();
  const [imageSize, setImageSize] = useState(128);
  const [selectedItem, setSelectedItem] = useState<PhotoIdentifier['node']>();

  useEffect(() => {
    setImageSize(Dimensions.get('screen').width / NumberOfColumns);
    CameraRoll.getPhotos({first: 20, assetType: assetTypes}).then(_items =>
      setCameraRollItems(_items),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMargin = (index: number) => {
    if (index % NumberOfColumns === 0) {
      return {
        marginRight: 2,
      };
    } else if (index % NumberOfColumns === 1) {
      return {
        marginHorizontal: 1,
      };
    } else {
      return {
        marginLeft: 2,
      };
    }
  };

  const selectAndClose = () => {
    if (selectedItem) {
      onSelect(selectedItem);
    }
  };

  return (
    <ReactNativeModal
      isVisible={show}
      onModalHide={onHide}
      animationIn="slideInUp"
      style={{margin: 0}}
      removeClippedSubviews={false}>
      <View style={styles.container}>
        <View style={styles.closeContainer}>
          <TouchableOpacity onPress={selectAndClose}>
            <Text
              style={[
                styles.selectText,
                {color: selectedItem ? colors.primary : colors.secondary},
              ]}>
              Select
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onHide}>
            <Icon name="close" size={36} style={styles.close} />
          </TouchableOpacity>
        </View>
        <FlatList
          numColumns={NumberOfColumns}
          data={cameraRollItems?.edges}
          renderItem={item => (
            <Pressable onPress={() => setSelectedItem(item.item.node)}>
              <Image
                key={item.item.node.image.uri}
                source={{uri: item.item.node.image.uri}}
                style={[
                  styles.image,
                  {
                    width: imageSize,
                    height: imageSize,
                    borderColor:
                      selectedItem === item.item.node
                        ? colors.green
                        : colors.transparent,
                  },
                  getMargin(item.index),
                ]}
              />
            </Pressable>
          )}
        />
      </View>
    </ReactNativeModal>
  );
};

export default CameraRollModal;
