import React,{FC} from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ConfirmationModalProps {
    visible: boolean;
    type: 'equipo' | 'proyecto' | 'miembro' | 'tarea';
    onConfirm: () => void;
    onCancel: () => void;
  }


const ConfirmationModal:FC<ConfirmationModalProps>= ({ visible, onConfirm, onCancel,type }) => {

    const getConfirmationText = () => {
        switch (type) {
          case 'equipo':
            return '¿Estás seguro de que quieres eliminar este equipo?';
          case 'proyecto':
            return '¿Estás seguro de que quieres eliminar este proyecto?';
          case 'miembro':
            return '¿Estás seguro de que quieres eliminar este miembro?';
          case 'tarea':
            return '¿Estás seguro de que quieres eliminar esta tarea?';
          default:
            return '¿Estás seguro?';
        }
      };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{getConfirmationText()}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={onCancel}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonConfirm]}
              onPress={onConfirm}
            >
              <Text style={styles.textStyle}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonConfirm: {
    backgroundColor: "#FF0000",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ConfirmationModal;
