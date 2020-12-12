import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { VictoryLine } from 'victory-native';

import { max, mean, min } from 'd3';

import globalStyles from '../../../styles';

export default function DiaryGraph({ data }) {
  const mappedData = data.map((obj) => obj.deviation);

  return (
    <View style={styles.container}>
      <Text style={[styles.labelText, styles.labelTextY]}>Movement (%)</Text>
      <View style={styles.graphWrapper}>
        <VictoryLine
          height={150}
          data={data}
          x="elapsedTime"
          y="deviation"
          labels={({ datum }) => (datum.rem ? 'R' : '')}
          domain={{ y: [min(mappedData), max(mappedData) * 0.8] }}
          padding={{ left: 70, right: 40, top: 20, bottom: 20 }}
          style={{
            data: {
              stroke: globalStyles.color.lightblue,
              strokeWidth: 2,
              strokeLinejoin: 'round',
              strokeLinecap: 'round',
            },
            labels: {
              fill: globalStyles.color.yellow,
              fontSize: 10,
            },
          }}
        />
        <Text style={styles.labelText}>Time elapsed (/3min)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.color.blue,
    borderRadius: 20,
    padding: 10,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphWrapper: {
    alignItems: 'center',
  },
  labelText: {
    color: globalStyles.color.gray,
  },
  labelTextY: { transform: [{ rotate: '-90deg' }], marginRight: -80 },
});
