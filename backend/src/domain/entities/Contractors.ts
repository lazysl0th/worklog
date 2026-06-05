interface IContractorsProps {
  id: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class Contractor {
  readonly id: string;
  readonly fullName: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: IContractorsProps) {
    this.id = props.id;
    this.fullName = props.fullName;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  public toJSON() {
    return { id: this.id, fullName: this.fullName };
  }
}
