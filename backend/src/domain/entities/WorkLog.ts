import MeasurementUnit from '../value-objects/MeasurementUnit.js';
import Contractor from './Contractors.js';
import WorkType from './WorkType.js';

interface IWorkLogProps {
  id: string;
  date: Date;
  workType: WorkType | { id: string };
  volume: number;
  unit: string;
  contractor: Contractor | { id: string };
  createdAt: Date;
  updatedAt: Date;
}

export default class WorkLog {
  readonly id: string;
  readonly date: Date;
  #workType: WorkType | { id: string };
  readonly volume: number;
  readonly unit: MeasurementUnit;
  #contractor: Contractor | { id: string };
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: IWorkLogProps) {
    this.id = props.id;
    this.date = props.date;
    this.#workType = props.workType;
    this.volume = Number(props.volume.toFixed(2));
    this.unit = new MeasurementUnit(props.unit);
    this.#contractor = props.contractor;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  get workType(): WorkType | { id: string } {
    return this.#workType;
  }

  get contractor(): Contractor | { id: string } {
    return this.#contractor;
  }

  public toJSON() {
    return {
      id: this.id,
      date: this.date,
      volume: this.volume,
      unit: this.unit.value,
      workType:
        this.#workType instanceof WorkType ? this.#workType.toJSON() : { id: this.#workType.id },
      contractor:
        this.#contractor instanceof Contractor
          ? this.#contractor.toJSON()
          : { id: this.#contractor.id },
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
