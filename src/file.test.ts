import WizFile from "./file";

describe("File", () => {
  it("should be able to create a new file", () => {
    const file = new WizFile(32, 32);
    expect(file.width).toBe(32);
    expect(file.height).toBe(32);
  });

  it("should have a default palette", () => {
    const file = new WizFile(32, 32);
    expect(file.palette).toBeDefined();
  });

  it("should have a background layer", () => {
    const file = new WizFile(32, 32);
    expect(file.data.length).toBe(1);
    expect(file.data[0].name).toBe("Background");
  });

  it("should have a background layer that is visible and locked", () => {
    const file = new WizFile(32, 32);
    expect(file.data[0].visible).toBe(true);
    expect(file.data[0].locked).toBe(true);
  })

});
