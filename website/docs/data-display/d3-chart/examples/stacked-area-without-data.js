import React from 'react';
import {
  Chart,
  XAxis,
  YAxis,
  minMax,
  colors,
  StackedArea,
  HoverLine,
  Tooltip,
} from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

export default () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 15]);

  return (
    <Chart data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis ticks={yScale.ticks()}>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis ticks={xScale.ticks()}>
        <XAxis.Ticks />
      </XAxis>
      <Tooltip tag={HoverLine} x="time" wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <Tooltip.Title>{data[xIndex].time}</Tooltip.Title>
                <Flex justifyContent="space-between">
                  <Tooltip.Dot mr={4} color={colors['orange-01']}>
                    Stack 3
                  </Tooltip.Dot>
                  <Text bold>{data[xIndex].stack3 ?? 'n/a'}</Text>
                </Flex>
                <Flex mt={2} justifyContent="space-between">
                  <Tooltip.Dot mr={4} color={colors['green-01']}>
                    Stack 2
                  </Tooltip.Dot>
                  <Text bold>{data[xIndex].stack2 ?? 'n/a'}</Text>
                </Flex>
                <Flex mt={2} justifyContent="space-between">
                  <Tooltip.Dot mr={4}>Stack 1</Tooltip.Dot>
                  <Text bold>{data[xIndex].stack1 ?? 'n/a'}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </Tooltip>
      <StackedArea x="time">
        <StackedArea.Area y="stack1">
          <StackedArea.Area.Null />
          <StackedArea.Area.Dots />
        </StackedArea.Area>
        <StackedArea.Area y="stack2" fill="#3AB01150" color="#3AB011">
          <StackedArea.Area.Null />
          <StackedArea.Area.Dots />
        </StackedArea.Area>
        <StackedArea.Area y="stack3" fill="#FF8E2950" color="#FF8E29">
          <StackedArea.Area.Null />
          <StackedArea.Area.Dots />
        </StackedArea.Area>
      </StackedArea>
    </Chart>
  );
};

const data = [
  { time: 0, stack1: 1, stack2: 4, stack3: 3 },
  { time: 1, stack1: 2, stack2: 3, stack3: 4 },
  { time: 2, stack1: 1, stack2: 4, stack3: 5 },
  { time: 3, stack1: null, stack2: null, stack3: null },
  { time: 4, stack1: null, stack2: null, stack3: null },
  { time: 5, stack1: 3, stack2: 4, stack3: 3 },
  { time: 6, stack1: null, stack2: null, stack3: null },
  { time: 7, stack1: 2, stack2: 5, stack3: 3 },
  { time: 8, stack1: 2, stack2: 6, stack3: 5 },
  { time: 9, stack1: 5, stack2: 5, stack3: 3 },
];
