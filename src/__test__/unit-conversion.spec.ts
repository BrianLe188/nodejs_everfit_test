import { convertDistance, convertTemperature } from "@/utils/unit-conversion";

describe("convert distance", () => {
  it("convert meter to centimeter", () => {
    expect(convertDistance(1, "meter", "centimeter")).toBe(100);
  });

  it("convert meter to inch", () => {
    expect(convertDistance(1, "meter", "inch")).toBeCloseTo(39.37008);
  });

  it("convert meter to feet", () => {
    expect(convertDistance(1, "meter", "feet")).toBeCloseTo(3.28084);
  });

  it("convert meter to yard", () => {
    expect(convertDistance(1, "meter", "yard")).toBeCloseTo(1.093613);
  });

  it("convert centimeter to meter", () => {
    expect(convertDistance(1, "centimeter", "meter")).toBe(0.01);
  });

  it("convert centimeter to inch", () => {
    expect(convertDistance(1, "centimeter", "inch")).toBeCloseTo(0.3937008);
  });

  it("convert centimeter to feet", () => {
    expect(convertDistance(1, "centimeter", "feet")).toBeCloseTo(0.0328084);
  });

  it("convert centimeter to yard", () => {
    expect(convertDistance(1, "centimeter", "yard")).toBeCloseTo(0.01093613);
  });

  it("convert inch to meter", () => {
    expect(convertDistance(1, "inch", "meter")).toBeCloseTo(0.0254);
  });

  it("convert inch to centimeter", () => {
    expect(convertDistance(1, "inch", "centimeter")).toBeCloseTo(2.54);
  });

  it("convert inch to feet", () => {
    expect(convertDistance(1, "inch", "feet")).toBeCloseTo(0.0833333);
  });

  it("convert inch to yard", () => {
    expect(convertDistance(1, "inch", "yard")).toBeCloseTo(0.0277778);
  });

  it("convert feet to meter", () => {
    expect(convertDistance(1, "feet", "meter")).toBeCloseTo(0.3048);
  });

  it("convert feet to centimeter", () => {
    expect(convertDistance(1, "feet", "centimeter")).toBeCloseTo(30.48);
  });

  it("convert feet to inch", () => {
    expect(convertDistance(1, "feet", "inch")).toBeCloseTo(12);
  });

  it("convert feet to yard", () => {
    expect(convertDistance(1, "feet", "yard")).toBeCloseTo(0.333333);
  });

  it("convert yard to meter", () => {
    expect(convertDistance(1, "yard", "meter")).toBeCloseTo(0.9144);
  });

  it("convert yard to centimeter", () => {
    expect(convertDistance(1, "yard", "centimeter")).toBeCloseTo(91.44);
  });

  it("convert yard to inch", () => {
    expect(convertDistance(1, "yard", "inch")).toBeCloseTo(36);
  });

  it("convert yard to feet", () => {
    expect(convertDistance(1, "yard", "feet")).toBeCloseTo(3);
  });
});

describe("convert temperature", () => {
  it("convert c_temp to f_temp", () => {
    expect(convertTemperature(100, "c_temp", "f_temp")).toBe(212);
  });

  it("convert f_temp to c_temp", () => {
    expect(convertTemperature(212, "f_temp", "c_temp")).toBe(100);
  });

  it("convert c_temp to k_temp", () => {
    expect(convertTemperature(-273.15, "c_temp", "k_temp")).toBeCloseTo(0);
  });

  it("convert k_temp to c_temp", () => {
    expect(convertTemperature(0, "k_temp", "c_temp")).toBeCloseTo(-273.15);
  });

  it("convert f_temp to k_temp", () => {
    expect(convertTemperature(-459.67, "f_temp", "k_temp")).toBeCloseTo(0);
  });

  it("convert k_temp to f_temp", () => {
    expect(convertTemperature(0, "k_temp", "f_temp")).toBeCloseTo(-459.67);
  });
});
