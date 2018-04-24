export default class Widget {
  x: number;
  y: number;
  width: number;
  height: number;
  // NOTE: imageURL should be in a different class (ImageWidget) that contains a Widget, but as this is a simple demo I just put it here.
  imageURL: String;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    imageURL: String
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.imageURL = imageURL;
  }
}
