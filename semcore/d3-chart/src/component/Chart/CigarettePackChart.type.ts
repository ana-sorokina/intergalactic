import React from 'react';
import { Intergalactic } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { BaseChartProps } from './AbstractChart.type';

type BarKey = string;

export type CigarettePackChartData = Array<Record<BarKey, number | string>>;

export type CigarettePackChartProps = BaseChartProps<CigarettePackChartData> & {
  x: string;
  y: string;
  xScale?: ScaleBand<any> | ScaleTime<any, any>;
  yScale?: ScaleLinear<any, any>;

  /** Handle click by `HoverRect`. `index` is an index of the data array. */
  onClickHoverRect?: (index: number, e: React.SyntheticEvent) => void;

  /** Handle click by Bar. */
  onClickBar?: (barItem: number, e: React.SyntheticEvent) => void;
};

export type CigarettePackChartType = Intergalactic.Component<typeof Flex, CigarettePackChartProps>;
