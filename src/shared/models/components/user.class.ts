import {BaseModel} from "rushapp-angular-core";

export class User extends BaseModel {
  public id: number;
  public email: string;

  protected fields(): string[] {
    return [
      'id',
      'email',
    ];
  }
}
