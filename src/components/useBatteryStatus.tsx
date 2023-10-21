import { useCallback, useEffect, useState } from "react";

const useBatteryStatus = () => {
    const [batteryLevel, setBatteryLevel] = useState<number>(0)
    const [isBatteryCharging, setIsBatteryCharging] = useState<boolean>(false)

    const updateBatteryLevel = useCallback((batteryLevel: number) => {
        setBatteryLevel(batteryLevel)
    }, [])
    const updateBatteryChargingStatus = useCallback((batteryCharging: boolean) => {
        setIsBatteryCharging(batteryCharging)
    }, [])

    const initiateFetchBattery = () => {
        if ('getBattery' in navigator) {

            navigator.getBattery().then((battery) => {
                updateBatteryLevel(battery.level * 100)
                updateBatteryChargingStatus(battery.charging)
                battery.addEventListener("levelchange", () => updateBatteryLevel(battery.level * 100));
                battery.addEventListener("chargingchange", () => updateBatteryChargingStatus(battery.charging));
            });
        }
    }

    const removeBatteryListeners = () => {
        if ('getBattery' in navigator) {
            navigator.getBattery().then((battery) => {
                battery.removeEventListener("levelchange", updateBatteryLevel(0));
                battery.removeEventListener("chargingchange", updateBatteryChargingStatus(false));
            });
        }
    }

    useEffect(() => {
        initiateFetchBattery()
        return () => {
            removeBatteryListeners()
        }
    }, [])
    return { batteryLevel, isBatteryCharging }
}

export default useBatteryStatus

