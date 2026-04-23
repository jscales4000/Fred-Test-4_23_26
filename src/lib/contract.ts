export const ROOM_NAME = 'CodexClass';

export const SOURCE_LABELS = [
  'PC',
  'PC Ext',
  'Apple TV',
  'AirMedia',
  'Laptop',
  'USB-C'
] as const;

export const CONTRACT = {
  roomName: ROOM_NAME,
  panelOnlineFeedback: `${ROOM_NAME}.PanelOnline`,
  roomPowerToggle: `${ROOM_NAME}.RoomPowerToggle`,
  roomPowerFeedback: `${ROOM_NAME}.RoomPowerOn`,
  masterVolumeUp: `${ROOM_NAME}.MasterVolumeUp`,
  masterVolumeDown: `${ROOM_NAME}.MasterVolumeDown`,
  masterMuteToggle: `${ROOM_NAME}.MasterMuteToggle`,
  masterMuteFeedback: `${ROOM_NAME}.MasterMuted`,
  display1: {
    activeFeedback: `${ROOM_NAME}.Display1ActiveSource`,
    sources: [
      `${ROOM_NAME}.Display1PcSelect`,
      `${ROOM_NAME}.Display1PcExtSelect`,
      `${ROOM_NAME}.Display1AppleTvSelect`,
      `${ROOM_NAME}.Display1AirMediaSelect`,
      `${ROOM_NAME}.Display1LaptopSelect`,
      `${ROOM_NAME}.Display1UsbCSelect`
    ]
  },
  display2: {
    activeFeedback: `${ROOM_NAME}.Display2ActiveSource`,
    sources: [
      `${ROOM_NAME}.Display2PcSelect`,
      `${ROOM_NAME}.Display2PcExtSelect`,
      `${ROOM_NAME}.Display2AppleTvSelect`,
      `${ROOM_NAME}.Display2AirMediaSelect`,
      `${ROOM_NAME}.Display2LaptopSelect`,
      `${ROOM_NAME}.Display2UsbCSelect`
    ]
  }
} as const;
