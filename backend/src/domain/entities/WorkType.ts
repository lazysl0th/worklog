interface IWorkTypeProps {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class WorkType {
  readonly id: string;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: IWorkTypeProps) {
    this.id = props.id;
    this.name = props.name;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
