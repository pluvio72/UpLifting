import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {
  CameraRoll,
  PhotoIdentifier,
  PhotoIdentifiersPage,
} from '@react-native-camera-roll/camera-roll';
import styles from './CameraRollModal.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  show: boolean;
  onHide: () => void;
  assetTypes?: 'Photos' | 'Videos' | 'All';
}

const CameraRollModal: React.FC<Props> = ({
  show,
  onHide,
  assetTypes = 'Photos',
}) => {
  const [cameraRollItems, setCameraRollItems] =
    useState<PhotoIdentifiersPage>();
  const [imageSize, setImageSize] = useState(128);

  useEffect(() => {
    setImageSize(Dimensions.get('screen').width / 3);
    CameraRoll.getPhotos({first: 20, assetType: assetTypes}).then(_items =>
      setCameraRollItems(_items),
    );
  }, []);

  const getMargin = (index: number) => {
    if (index % 3 === 0) {
      return {
        marginRight: 2,
      };
    } else if (index % 3 === 1) {
      return {
        marginHorizontal: 2,
      };
    } else {
      return {
        marginLeft: 2,
      };
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
          <TouchableOpacity onPress={onHide}>
            <Icon name="close" size={36} style={styles.close}/>
          </TouchableOpacity>
        </View>
        <FlatList
          numColumns={3}
          data={cameraRollItems?.edges}
          renderItem={(item) => (
            <Image
              key={item.item.node.image.uri}
              source={{uri: item.item.node.image.uri}}
              style={[
                {
                  width: imageSize,
                  height: imageSize,
                },
                styles.image,
                getMargin(item.index),
              ]}
            />
          )}
        />
      </View>
    </ReactNativeModal>
  );
};

export default CameraRollModal;
