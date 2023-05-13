import { useEffect, useState } from "react";
import { colors, globalStyles, customizeText } from "../../../styles/styles";
import {
  TraslucentModal,
  StateTraslucentModal,
} from "../../modals/TraslucentModal";
import { View, Text } from "react-native";
import TagTypeSpend from "../TagTypeSpend";
import ActionsSelectedSpend from "./ActionsSelectedSpend";
import useSelectedSpend from "../../../hooks/manageSpends/useSelectedSpend";

export const StateSelectedSpend = () => {
  //watch one spend
  const [selectedSpend, setSelectedSpend] = useState(null);

  return { selectedSpend, setSelectedSpend };
};

export const SelectedSpend = (props) => {
  const { selectedSpend, setSelectedSpend, actions = true, effect } = props;
  const manageTraslucentModal = StateTraslucentModal();
  const { dropSpend } = useSelectedSpend();
  const [message, setMessage] = useState("");

  useEffect(() => {
    manageSelectedSpend();
    return () => {};
  }, [selectedSpend]);

  function manageSelectedSpend() {
    if (!!selectedSpend) manageTraslucentModal.setVisible(true);
  }

  function closeViewSelectedSpend() {
    setSelectedSpend(null);
  }

  async function handleDropSpend() {
    const res = await dropSpend(selectedSpend.id);
    if (res) {
      setMessage("Listo, se ha eliminado este elemento");
      setTimeout(() => {
        setMessage("");
        closeViewSelectedSpend();
        manageTraslucentModal.setVisible(false);
      }, 2000);
    }
  }

  async function handleEditSpend() {}

  return (
    <TraslucentModal
      visible={manageTraslucentModal.visible}
      setVisible={manageTraslucentModal.setVisible}
      managerClose={closeViewSelectedSpend}
      altStyle={{ justifyContent: "center" }}
    >
      <View style={{ ...globalStyles.card, backgroundColor: colors.snow }}>
        {!!message ? (
          <Text style={customizeText(18, "M", "N", "left")}>{message}</Text>
        ) : (
          <>
            <View
              style={{
                ...globalStyles.rowSpaceBetw,
                marginVertical: 15,
                alignItems: "center",
              }}
            >
              <Text style={customizeText(18, "I", "N")}>
                {`${selectedSpend?.dateSpend}`}
              </Text>
              <TagTypeSpend typeSpend={selectedSpend?.typeSpend} />
            </View>
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
            <Text style={customizeText(18, "M", "N")}>
              {`${selectedSpend?.description}`}
            </Text>
            {actions && (
              <ActionsSelectedSpend
                dropAction={handleDropSpend}
                editAction={handleEditSpend}
              />
            )}
          </>
        )}
      </View>
    </TraslucentModal>
  );
};
