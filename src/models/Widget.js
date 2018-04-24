export class Widget {
  x: number;
  y: number;
  width: number;
  height: number;
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
