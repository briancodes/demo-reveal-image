import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { filter } from 'rxjs/operators/filter';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { InstanceId } from '../../utils/instance-id';

export abstract class AbstractSettingsManager {
  abstract initSettings(value: SettingsData);
  abstract set forcedReflow(value: boolean);
}

export abstract class AbstractSettingsConsumer {
  abstract getUpdates(): Observable<SettingsData>;
}

export interface SettingsData {
  forceReflow: boolean;
}

@Injectable()
export class SettingsEventService extends InstanceId implements AbstractSettingsManager, AbstractSettingsConsumer {

  private settingsBehaviorSubject: BehaviorSubject<SettingsData>;
  private initialized: boolean;
  private settings: SettingsData;

  constructor() {
    super();
  }

  initSettings(value: SettingsData) {
    if (!this.initialized) {
      this.initialized = true;
      this.settings = Object.assign({}, value);
      this.settingsBehaviorSubject = new BehaviorSubject(value);
    }
  }

  set forcedReflow(value: boolean) {
    this.settings.forceReflow = value;
    this.settingsBehaviorSubject.next(Object.assign({}, this.settings));
  }

  getUpdates(): Observable<SettingsData> {
    return this.settingsBehaviorSubject.asObservable();
  }
}
