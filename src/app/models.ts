export class ApiModel {
  constructor(public id: number, public description: string) {}
}

export class UiModel {
  constructor(public response1: ApiModel, public response2: ApiModel) {}
}
