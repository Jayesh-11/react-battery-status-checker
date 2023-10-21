import { useCallback, useEffect, useState } from "react";
var useBatteryStatus = function () {
    var _a = useState(0), batteryLevel = _a[0], setBatteryLevel = _a[1];
    var _b = useState(false), isBatteryCharging = _b[0], setIsBatteryCharging = _b[1];
    var updateBatteryLevel = useCallback(function (batteryLevel) {
        setBatteryLevel(batteryLevel);
    }, []);
    var updateBatteryChargingStatus = useCallback(function (batteryCharging) {
        setIsBatteryCharging(batteryCharging);
    }, []);
    var initiateFetchBattery = function () {
        if ('getBattery' in navigator) {
            navigator.getBattery().then(function (battery) {
                updateBatteryLevel(battery.level * 100);
                updateBatteryChargingStatus(battery.charging);
                battery.addEventListener("levelchange", function () { return updateBatteryLevel(battery.level * 100); });
                battery.addEventListener("chargingchange", function () { return updateBatteryChargingStatus(battery.charging); });
            });
        }
    };
    var removeBatteryListeners = function () {
        if ('getBattery' in navigator) {
            navigator.getBattery().then(function (battery) {
                battery.removeEventListener("levelchange", updateBatteryLevel(0));
                battery.removeEventListener("chargingchange", updateBatteryChargingStatus(false));
            });
        }
    };
    useEffect(function () {
        initiateFetchBattery();
        return function () {
            removeBatteryListeners();
        };
    }, []);
    return { batteryLevel: batteryLevel, isBatteryCharging: isBatteryCharging };
};
export default useBatteryStatus;
//# sourceMappingURL=useBatteryStatus.js.map