import React from 'react';
import { Component, Intergalactic } from '@semcore/core';
import { LegendItemKey, LegendItemProps } from './LegendItem/LegendItem.type';
import { LegendProps } from './BaseLegend.type';

export class BaseLegend<T extends LegendProps> extends Component<T> {
  get itemsAsList(): Array<Extract<T['items'][LegendItemKey], {}> & { id: LegendItemKey }> {
    // @ts-ignore
    return Object.entries(this.asProps.items).map(([key, item]) => {
      return {
        id: key,
        ...item,
      };
    });
  }

  getItem(index: number) {
    const line = this.itemsAsList[index];

    if (line === undefined) {
      throw new Error(`No index "${index}" in lines`);
    }

    return line;
  }

  getLegendItemProps(
    _: {},
    index: number,
  ): LegendItemProps & Intergalactic.InternalTypings.ComponentPropsNesting<'div'> {
    const { shape = 'Checkbox', size = 'm' } = this.asProps;
    const line = this.getItem(index);

    return {
      ...line,
      shape,
      size,
      onClick: this.bindOnChange(line.id),
      onMouseEnter: this.bindOnMouseEnterItem(line.id),
      onMouseLeave: this.bindOnMouseLeaveItem(line.id),
      style: { gridRowStart: `${index + 1}`, gridRowEnd: `${index + 2}` },
    };
  }

  bindOnChange = (id: LegendItemKey) => {
    const item = this.asProps.items[id];

    return () => {
      const checked = !item?.checked;

      this.props.onChangeVisibleItem?.(id, checked);
    };
  };

  bindOnMouseEnterItem = (id: LegendItemKey) => {
    return (e: React.SyntheticEvent) => {
      this.props.onMouseEnterItem?.(id, e);
    };
  };

  bindOnMouseLeaveItem = (id: LegendItemKey) => {
    return (e: React.SyntheticEvent) => {
      this.props.onMouseLeaveItem?.(id, e);
    };
  };
}