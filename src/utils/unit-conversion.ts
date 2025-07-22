import { DistanceUnit, TemperatureUnit } from "@/types/unit";

export function convertDistance(
  value: number,
  from: DistanceUnit,
  to: DistanceUnit,
): number {
  const meters = {
    meter: 1,
    centimeter: 0.01,
    inch: 0.0254,
    feet: 0.3048,
    yard: 0.9144,
  };

  if (!(from in meters) || !(to in meters))
    throw new Error("Distance Unit not found");

  return (value * meters[from]) / meters[to];
}

function convertToCTemperature(value: number, from: string) {
  switch (from) {
    case "c_temp":
      return value;
    case "f_temp":
      return ((value - 32) * 5) / 9;
    case "k_temp":
      return value - 273.15;
    default:
      throw new Error("Temperature Unit not found");
  }
}

export function convertTemperature(
  value: number,
  from: TemperatureUnit,
  to: TemperatureUnit,
): number {
  if (from === to) return value;

  const cTemp = convertToCTemperature(value, from);

  switch (to) {
    case "c_temp":
      return cTemp;
    case "f_temp":
      return (cTemp * 9) / 5 + 32;
    case "k_temp":
      return cTemp + 273.15;
    default:
      throw new Error("Temperature Unit not found");
  }
}
