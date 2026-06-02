import type MeasurementUnit from '../ value-objects/MeasurementUnit.js';

interface IWorkLogProps {
  id: string;
  date: Date;
  workTypeId: string;
  volume: number;
  unit: MeasurementUnit;
  contractorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class WorkLog {
  readonly id: string;
  readonly date: Date;
  readonly workTypeId: string;
  readonly volume: number;
  readonly unit: MeasurementUnit;
  readonly contractorId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: IWorkLogProps) {
    this.id = props.id;
    this.date = props.date;
    this.workTypeId = props.workTypeId;
    this.volume = props.volume;
    this.unit = props.unit;
    this.contractorId = props.contractorId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
