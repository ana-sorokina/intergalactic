import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';

export interface IDonutProps extends IContext {
  /* Inner radius */
  innerRadius?: number;
  /* Half donut */
  half?: boolean;
}

export interface IPieProps extends IContext {
  /** Color pie
    @default #50aef4
   **/
  color?: string;
}

export interface INotDataProps extends IContext {}

export interface ILabelProps extends IContext {}

declare const Donut: (<T>(props: CProps<IDonutProps & T>) => ReturnEl) & {
  Pie: <T>(props: CProps<IPieProps & T>) => ReturnEl;
  NotData: <T>(props: CProps<INotDataProps & T>) => ReturnEl;
  Label: <T>(props: CProps<ILabelProps & T>) => ReturnEl;
};

export default Donut;
