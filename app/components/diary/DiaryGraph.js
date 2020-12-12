import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { VictoryLine } from 'victory-native';

import { max, min } from 'd3';

import globalStyles from '../../styles';

export default function DiaryGraph({ data }) {
  //Use standard maxDomain of 0.1 when component mounts
  const [maxDomain, setMaxDomain] = React.useState(0.1);
  const [minDomain, setMinDomain] = React.useState(0);

  //Change maxDomain to maxDeviation (based off of data) in useEffect when component mounts
  React.useEffect(() => {
    const mappedData = data.map((obj) => obj.deviation);
    setMaxDomain(max(mappedData));
    setMinDomain(min(mappedData));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.labelText, styles.labelTextY]}>Movement (%)</Text>
      <View style={styles.graphWrapper}>
        <VictoryLine
          height={200}
          data={data}
          x="elapsedTime"
          y="deviation"
          labels={({ datum }) => (datum.rem ? 'REM' : '')}
          domain={{ y: [minDomain, maxDomain] }}
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
