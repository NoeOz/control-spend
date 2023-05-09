import { useEffect } from "react";
import { colors, globalStyles, customizeText } from "../../styles/styles";
import {
  TraslucentModal,
  StateTraslucentModal,
} from "../modals/TraslucentModal";
import { View, Text } from "react-native";
import TagTypeSpend from "./TagTypeSpend";
import ActionsSelectedSpend from "./ActionsSelectedSpend";

const SelectedSpend = ({ selectedSpend, setSelectedSpend }) => {
  const manageTraslucentModal = StateTraslucentModal();

  useEffect(() => {
    manageSelectedSpend();
    return () => {};
  }, [selectedSpend]);

  function manageSelectedSpend() {
    if (!!selectedSpend) manageTraslucentModal.setVisible(true);
  }

  return (
    <TraslucentModal
      visible={manageTraslucentModal.visible}
      setVisible={manageTraslucentModal.setVisible}
      altStyle={{ justifyContent: "center" }}
    >
      <View style={{ ...globalStyles.card, backgroundColor: colors.snow }}>
        <View style={globalStyles.rowSpaceBetw}>
          <Text
            style={customizeText(18, "L", "N", "left", {
              textTransform: "capitalize",
            })}
          >
            {`${selectedSpend?.name}`}
          </Text>
          <Text style={customizeText(22, "M", "N")}>
            {`$${selectedSpend?.mount}`}
          </Text>
        </View>
        {selectedSpend?.description && (
          <Text style={customizeText(18, "M", "N")}>
            {`${selectedSpend.description}`}
          </Text>
        )}
        <View style={{ ...globalStyles.rowSpaceBetw, marginVertical: 15 }}>
          <Text style={customizeText(18, "I", "N")}>
            {`${selectedSpend?.date}`}
          </Text>
          <TagTypeSpend typeSpend={selectedSpend?.typeSpend} />
        </View>
        <ActionsSelectedSpend />
      </View>
    </TraslucentModal>
  );
};

export default SelectedSpend;
