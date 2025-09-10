import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { NewsDataType } from '../types';

type Props = {
    items: NewsDataType[];
    paginationIndex: number;
    scrollX: SharedValue<number>;
}

const pagination = ({ items, paginationIndex, scrollX}: Props) => {
  return (
    <View>
      <Text>pagination</Text>
    </View>
  )
}

export default pagination

const styles = StyleSheet.create({})