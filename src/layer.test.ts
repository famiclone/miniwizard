import Layer from "./layer";

describe('Layer', () => {
  it('should be created', () => {
    const layer = new Layer();
    
    expect(layer).toBeTruthy();
  });

  it('should be created with default values', () => {
    const layer = new Layer();

    expect(layer).toBeTruthy();
    expect(layer.name).toBe('New Layer');
    expect(layer.locked).toBe(false);
    expect(layer.width).toBe(16);
    expect(layer.height).toBe(16);
  })

  it('should be created with custom values', () => {
    const layer = new Layer('New Layer', true, 100, 100);

    expect(layer).toBeTruthy();
    expect(layer.name).toBe('New Layer');
    expect(layer.locked).toBe(true);
    expect(layer.width).toBe(100);
    expect(layer.height).toBe(100);
  })

  it('should returns correct opacity', () => {
    const layer = new Layer();

    layer.opacity = 25;

    expect(layer.opacity).toBe(25);
  })

  it('should returns correct visible', () => {
    const layer = new Layer();

    layer.visible = false;

    expect(layer.visible).toBe(false);
  })

  it('should returns correct data', () => {
    const layer = new Layer();

    expect(layer.data).toBeTruthy();
    expect(layer.data.width).toBe(16);
    expect(layer.data.height).toBe(16);
  })

  it('should returns correct data with custom values', () => {
    const layer = new Layer('New Layer', true, 100, 100);

    layer.data.data[0] = 255;
    layer.data.data[1] = 255;
    layer.data.data[2] = 255;
    layer.data.data[3] = 255;

    expect(layer.data.data[0]).toBe(255);
    expect(layer.data.data[1]).toBe(255);
    expect(layer.data.data[2]).toBe(255);
    expect(layer.data.data[3]).toBe(255);
  })
})
