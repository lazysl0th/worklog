import MeasurementUnit from '../value-objects/MeasurementUnit.js';

interface IWorkLogProps {
  id: string;
  date: Date;
  workTypeId: string;
  volume: number;
  unit: string;
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
    this.volume = Number(props.volume.toFixed(2));
    this.unit = new MeasurementUnit(props.unit);
    this.contractorId = props.contractorId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
