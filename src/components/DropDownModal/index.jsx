import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../helpers/colors';
import { RELATIONS } from '../../helpers/data';
import { BOTTOM_INSET, heightPixel, widthPixel } from '../../helpers/metrics';
import BottomSheetModal from '../BottomSheetModal';
import FlatList from '../FlatList';
import Row from '../Row';
import Text from '../Text';


const DropDownModal = ({ visible, onSelect, onClose }) => {

  const handleSelect = item => {
    onSelect(item);
    onClose();
  };

  return (
    <BottomSheetModal
      visible={visible}
      onClose={onClose}
      initialHeight={500}
      title="Select Relation"
    >
      <FlatList
        data={RELATIONS}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: BOTTOM_INSET + heightPixel(20) }}
        keyboardShouldPersistTaps="handled"
        separator={0}
        renderItem={({ item }) => (
          <Row
            align="center"
            justify="space-between"
            onPress={() => handleSelect(item)}
            style={styles.item}
          >
            <View style={styles.name}>
              <Text weight="semibold" size={16} color={colors.black}>
                {item.name}
              </Text>
            </View>
          </Row>
        )}
      />
    </BottomSheetModal>
  );
};

export default memo(DropDownModal);

const styles = StyleSheet.create({
  list: {
    marginTop: heightPixel(16),
  },
  item: {
    paddingVertical: heightPixel(14),
    paddingHorizontal: widthPixel(8),
    borderBottomWidth: heightPixel(1),
    borderBottomColor: colors.light_gray,
  },
  name: {
    flex: 1,
  },
});
