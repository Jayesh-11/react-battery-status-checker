import { renderHook } from "@testing-library/react"
import { useBatteryStatus } from "../src/index"

describe("useFormHook", () => {
  test("should update form values", () => {
    const { result } = renderHook(() => useBatteryStatus())
    expect(result.current.isBatteryCharging).toEqual(false)
  })
})
