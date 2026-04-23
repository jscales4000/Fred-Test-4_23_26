import { writable } from 'svelte/store';
import { CONTRACT } from '../contract';
import { publishDigital, subscribeAnalog, subscribeDigital } from '../CrComLib';

export const panelOnline = writable(true);
export const roomPowerOn = writable(false);
export const audioMuted = writable(false);
export const display1Selected = writable(1);
export const display2Selected = writable(6);

export function initSignals(): void {
  subscribeDigital(CONTRACT.panelOnlineFeedback, (value) => panelOnline.set(value));
  subscribeDigital(CONTRACT.roomPowerFeedback, (value) => roomPowerOn.set(value));
  subscribeDigital(CONTRACT.masterMuteFeedback, (value) => audioMuted.set(value));
  subscribeAnalog(CONTRACT.display1.activeFeedback, (value) => {
    if (value >= 1 && value <= 6) display1Selected.set(value);
  });
  subscribeAnalog(CONTRACT.display2.activeFeedback, (value) => {
    if (value >= 1 && value <= 6) display2Selected.set(value);
  });
}

export function selectDisplaySource(display: 1 | 2, sourceIndex: 1 | 2 | 3 | 4 | 5 | 6): void {
  const signal = display === 1 ? CONTRACT.display1.sources[sourceIndex - 1] : CONTRACT.display2.sources[sourceIndex - 1];
  if (display === 1) {
    display1Selected.set(sourceIndex);
  } else {
    display2Selected.set(sourceIndex);
  }
  pulseSignal(signal);
}

export function toggleRoomPower(): void {
  roomPowerOn.update((value) => {
    const next = !value;
    pulseSignal(CONTRACT.roomPowerToggle);
    return next;
  });
}

export function toggleAudioMute(): void {
  audioMuted.update((value) => {
    const next = !value;
    pulseSignal(CONTRACT.masterMuteToggle);
    return next;
  });
}

export function volumeUp(): void {
  pulseSignal(CONTRACT.masterVolumeUp);
}

export function volumeDown(): void {
  pulseSignal(CONTRACT.masterVolumeDown);
}

function pulseSignal(signalName: string): void {
  publishDigital(signalName, true);
  setTimeout(() => publishDigital(signalName, false), 120);
}
