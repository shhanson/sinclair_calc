import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons';

import Header from '../components/Header';
import coefficients from '../coefficients';
import mastersCoefficients from '../masters_coefficients';
import styles from '../styles';
import renderIf from '../renderif';

class Masters extends Component {
  static navigationOptions = {
    tabBarLabel: 'Masters',
    tabBarIcon: () => (
      <Text style={{ fontSize: 20 }}>Masters</Text>
    ),


  };

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: { label: 'Male', value: 'm' },
      age: '',
      weight: '',
      total: '',
      sinclairTotal: '',
      calcPressed: false,
    };
  }

  onCalculate() {
    let sinclairTotal = this.state.total || 0;

    if (this.state.selectedOption.value === 'm') {
      if (this.state.weight && this.state.weight <= coefficients.male.b) {
        const X = Math.log10(this.state.weight / coefficients.male.b);
        const SC = Math.pow(10, coefficients.male.A * Math.pow(X, 2));
        sinclairTotal = this.state.total * SC * mastersCoefficients[this.state.age];
      }
    } else if (this.state.weight && this.state.weight <= coefficients.female.b) {
        const X = Math.log10(this.state.weight / coefficients.female.b);
        const SC = Math.pow(10, coefficients.female.A * Math.pow(X, 2));
        sinclairTotal = this.state.total * SC * mastersCoefficients[this.state.age];
      }

    sinclairTotal = sinclairTotal.toFixed(2);
    this.setState({ calcPressed: true, });
    this.setState({ sinclairTotal });
  }

  onWeightChange(weight) {
    this.setState({ weight });
  }

  onTotalChange(total) {
    this.setState({ total });
  }

  onAgeChange(age) {
    this.setState({ age });
  }

  onClear() {
    this.setState({
      selectedOption: { label: 'Male', value: 'm' },
      weight: '',
      total: '',
      sinclairTotal: '',
      age: '',
      calcPressed: false,
    });
  }

  render() {
    function setSelectedOption(selectedOption) {
      this.setState({ selectedOption });
    }

    return (
      <View>
        <Header headerText='Masters Sinclair Calculator' />
        <View>
          <View style={styles.viewStyle}>
            <SegmentedControls
              options={options}
              onSelection={setSelectedOption.bind(this)}
              selectedOption={this.state.selectedOption}
              extractText={(option) => option.label}
            />
            <Text style={styles.inputLabel}>Age</Text><TextInput
              style={styles.inputStyle}
              value={this.state.age}
              onChange={event => this.onAgeChange(event.nativeEvent.text)}
            />
            <Text style={styles.inputLabel}>Weight (kg)</Text><TextInput
              style={styles.inputStyle}
              value={this.state.weight}
              onChange={event => this.onWeightChange(event.nativeEvent.text)}
            />

            <Text style={styles.inputLabel}>Total (kg)</Text><TextInput
              style={styles.inputStyle}
              value={this.state.total}
              onChange={event => this.onTotalChange(event.nativeEvent.text)}
            />

            <View style={styles.containerStyle}>
              <TouchableOpacity style={styles.calcBtnStyle} onPress={() => this.onCalculate()}>
                <Text style={styles.calcTextStyle}>
                  Calculate
                </Text>
              </TouchableOpacity>
            </View>


            <View style={styles.containerStyle}>
              <TouchableOpacity style={styles.clearBtnStyle} onPress={() => this.onClear()}>
                <Text style={styles.clearTextStyle}>
                  Clear
                </Text>
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.resultViewStyle}>
            {renderIf(this.state.calcPressed)(
              <Text style={styles.resultLabelStyle}>Sinclair-Meltzer-Faber Total:</Text>
            )}
            <Text style={styles.resultTextStyle}>
              {this.state.sinclairTotal}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const options = [
  {
    label: 'Male',
    value: 'm',
  },
  {
    label: 'Female',
    value: 'f',
  },
];

export default Masters;
