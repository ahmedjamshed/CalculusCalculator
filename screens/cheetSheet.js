import React from 'react';
import {StyleSheet, Dimensions, View, Platform} from 'react-native';

import Pdf from 'react-native-pdf';

export default class CheatSheet extends React.Component {
  render() {
    // const source = {
    //   uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    //   cache: true,
    // };
    let source = '';
    if (Platform.OS === 'ios') {
      source = require('../cheat_sheet.pdf');
    } else {
      source = {uri: 'bundle-assets://cheat_sheet.pdf'}; // ios only
    }
    //const source = {uri:'bundle-assets://test.pdf'};

    //const source = {uri:'file:///sdcard/test.pdf'};
    //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};

    return (
      <View style={styles.container}>
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link presse: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
