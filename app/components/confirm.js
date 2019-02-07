import React from 'react';
import settings from '../config/settings';
import { ActivityIndicator, Modal, Text, View, Button  } from 'react-native';

export default class ConfirmModal extends React.Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
    return (
      <View>
        <Button
          color={this.props.color}
          title={this.props.label}
          onPress={() => this.setModalVisible(true)}
        />
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(false)
            }}>
            <View style={{marginTop: 22, flexDirection: 'column', alignItems: 'stretch'}}>
              <View style={{flexDirection: 'column', alignItems: 'stretch'}}>
                <Text style={{ fontSize: 24 }}>{this.props.title}</Text>
                <Text style={{ padding: 20 }}>Are you sure you wish to {this.props.title}?</Text>

                <View style={{flexDirection: 'column', alignItems: 'stretch'}}>
                  <Button
                    style={{flex: 1}}
                    title="No, dont"
                    onPress={() => {this.setModalVisible(false)}} />
                  <Button
                    style={{flex: 1}}
                    color={this.props.color}
                    title={this.props.label}
                    onPress={() => this.props.handleClick()} />
                </View>
              </View>
            </View>
          </Modal>
        </View>
    )
  }
}
