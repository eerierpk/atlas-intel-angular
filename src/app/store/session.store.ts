import { Injectable, signal, computed } from '@angular/core';
import { Device } from '@app/data-access/fixtures/devices.fixture';

@Injectable({
  providedIn: 'root'
})
export class SessionStore {
  private _compareList = signal<Device[]>([]);
  private _savedDevicesList = signal<Device[]>([]);
  
  compareList = computed(() => this._compareList());
  savedDevicesList = computed(() => this._savedDevicesList());
  
  addToCompare(device: Device) {
    if (this._compareList().length < 4 && !this._compareList().find(d => d.id === device.id)) {
      this._compareList.update(list => [...list, device]);
    }
  }

  removeFromCompare(deviceId: string) {
    this._compareList.update(list => list.filter(d => d.id !== deviceId));
  }

  toggleSaved(device: Device) {
    this._savedDevicesList.update(list => {
      const exists = list.find(d => d.id === device.id);
      if (exists) {
        return list.filter(d => d.id !== device.id);
      } else {
        return [...list, device];
      }
    });
  }
}
