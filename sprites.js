class Button {
    #image;
    #text;
    #x;
    #y;
    #width;
    #height;
    #callback;
    constructor(image, text, x, y, width, height, callback) {
        this.#image = image;
        this.#text = text;
        this.#x = x;
        this.#y = y;
        this.#height = height
        this.#width = width;
        this.#callback = callback
    }
    draw(canvas) {
        canvas.textAlign = "center"
        canvas.drawImage(this.#image, this.#x, this.#y, this.#width, this.#height)
        canvas.fillText(this.#text, this.#x + this.#width / 2, this.#y + this.#height / 2 + 5, this.#width)
    }
    click(mouseX, mouseY) {
        if (this.#x <= mouseX && mouseX <= this.#x + this.#width && this.#y <= mouseY && mouseY <= this.#y + this.#height) {
            this.#callback()
        }
    }
}
class Player {
    #x
    #y
    #vX
    #vY
    #width
    #height
    #image
    constructor(image, x, y, width, height) {
        this.#x = x;
        this.#y = y;
        this.#vX = 0;
        this.#vY = 0;
        this.#width = width;
        this.#height = height;
        this.#image = image;
    }
    getWidth() {
        return this.#width;
    }
    getHeight() {
        return this.#width;
    }
    getX() {
        return this.#x;
    }
    setX(x) {
        this.#x = x;
    }
    getY() {
        return this.#y;
    }
    setY(y) {
        this.#y = y;
    }
    getVX() {
        return this.#vX;
    }
    getVY() {
        return this.#vY;
    }
    setVX(vX) {
        this.#vX = vX;
    }
    setVY(vY) {
        this.#vY = vY;
    }
    draw(canvas) {
        this.#x += this.#vX;
        this.#y += this.#vY;
        canvas.drawImage(this.#image, this.#x, this.#y, this.#width, this.#height);
    }
    isColliding(canvas, vX, vY) {
        let x = this.getX() + vX;
        let y = this.getY() + vY;
        if ((x <= 0 && 0 <= x + this.getWidth()) 
        || (x <= canvas.width && canvas.width <= x + this.getWidth())
        || (y <= 0 && 0 <= y + this.getHeight()) 
        || (y <= canvas.height && canvas.height <= y + this.getHeight())) {
            return true;
        }
        return false;
    }
    canPickUp(trash) {
        return trash.getX() < this.getX() + this.getWidth()
        && trash.getX() + trash.getWidth() > this.getX()
        && trash.getY() < this.getY() + this.getHeight()
        && trash.getY() + trash.getHeight() > this.getY();
    }
}
class Trash {
    #x
    #y
    #width
    #height
    #image
    #time
    constructor(image, x, y, width, height) {
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
        this.#image = image;
        this.#time = 0;
    }
    draw(canvas) {
        this.#time++;
        canvas.drawImage(this.#image, this.#x, this.#y, this.#width, this.#height);
    }
    getWidth() {
        return this.#width;
    }
    getHeight() {
        return this.#width;
    }
    getX() {
        return this.#x;
    }
    setX(x) {
        this.#x = x;
    }
    getY() {
        return this.#y;
    }
    setY(y) {
        this.#y = y;
    }
    getTime() {
        return this.#time
    }
}
export {Button, Player, Trash}
