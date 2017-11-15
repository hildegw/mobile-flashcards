/*

renderAddDeckButton = () => {
  const deviceWidth = Dimensions.get('window').width
  const inputError = this.validate(this.state.deckName)

  return (
    <View style={styles.button}>
      <SelectButton
        onPress={() => this.setState({open: true})}
        children={'Add Deck'}
        style={[{borderColor: orange}]}
      />

      <Modal
        visible={this.state.open}
        onRequestClose={() => this.setState({open: false})}
        animationType="slide"
        transparent={true}
         >

        <View style={styles.modalStyle}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 5}}
            onChangeText={(value) => this.setState({deckName: value.trim()})}
            autoFocus={true}
            autoCapitalize={'words'}
            maxLength={50}
            placeholder={'New Deck Title'}
            selectTextOnFocus={true}
          />

          {!inputError
            ? <SelectButton
                onPress={() => this.onPressAddDeckTitle()}
                children={'Add Deck'}
                style={[{backgroundColor: white}, {borderColor: orange}]} >
              </SelectButton>
            : <SelectButton
                style={[{backgroundColor: white}, {borderColor: white}]}
                children={'Please add a deck title'} >
              </SelectButton>
          }
        </View>
      </Modal>
    </View>
  )
}

*/
