import History from "./history";

describe("History", () => {
  let history: History;

  beforeEach(() => {
    history = new History();
  });

  it("should be able to create a new history", () => {
    expect(history).toBeDefined();
  });

  it("should be able to add an item to the history", () => {
    history.add(new ImageData(1, 1));
    expect(history.stack.length).toBe(1);
  });

  it("should be able to undo an item", () => {
    history.add(new ImageData(1, 1));
    history.undo();
    expect(history.stack.length).toBe(0);
  });

  it("should be able to redo an item", () => {
    history.add(new ImageData(1, 1));
    history.undo();
    history.redo();
    expect(history.stack.length).toBe(1);
  });

  it("should be able to clear the history", () => {
    history.add(new ImageData(1, 1));
    history.add(new ImageData(1, 1));
    history.add(new ImageData(1, 1));
    history.clear();
    expect(history.stack.length).toBe(0);
  });

  it("should be able to add a maximum of 5 items", () => {
    history.add(new ImageData(1, 1));
    history.add(new ImageData(1, 1));
    history.add(new ImageData(1, 1));
    history.add(new ImageData(1, 1));
    history.add(new ImageData(1, 1));
    history.add(new ImageData(1, 1));
    expect(history.stack.length).toBe(5);
  });

});
