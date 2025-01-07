import { Params } from "../../interface/core.interface";
import { LicenseKey } from "../../interface/license-key.interface";

export class GetLicenseKeys {
  static readonly type = "[LicenseKey] Get";
  constructor(public payload?: Params) {}
}

export class CreateLicenseKey {
  static readonly type = "[LicenseKey] Create";
  constructor(public payload: LicenseKey) {}
}

export class EditLicenseKey {
  static readonly type = "[LicenseKey] Edit";
  constructor(public id: number) {}
}

export class UpdateLicenseKey {
  static readonly type = "[LicenseKey] Update";
  constructor(public payload: LicenseKey, public id: number) {}
}

export class UpdateLicenseKeyStatus {
  static readonly type = "[LicenseKey] Update Status";
  constructor(public id: number, public status: boolean) {}
}

export class DeleteLicenseKey {
  static readonly type = "[LicenseKey] Delete";
  constructor(public id: number) {}
}

export class DeleteAllLicenseKey {
  static readonly type = "[LicenseKey] Delete All";
  constructor(public ids: number[]) {}
}