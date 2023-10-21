declare const useBatteryStatus: () => {
    batteryLevel: number;
    isBatteryCharging: boolean;
};
export default useBatteryStatus;
