let shop;
let snake;
let resolution = 20;
let shopIsOpen = false;
let apple = 0;
let orange = 0;

function setup() {
    createCanvas(600, 400);
    snake = new Snake();
    shop = new Shop();
    frameRate(10);
    pickLocation();
}

function keyPressed() {
    if (keyCode === UP_ARROW && snake.ydir !== 1) {
        snake.setDir(0, -1);
    } else if (keyCode === DOWN_ARROW && snake.ydir !== -1) {
        snake.setDir(0, 1);
    } else if (keyCode === RIGHT_ARROW && snake.xdir !== -1) {
        snake.setDir(1, 0);
    } else if (keyCode === LEFT_ARROW && snake.xdir !== 1) {
        snake.setDir(-1, 0);
    }
}

function pickLocation() {
    let cols = floor(400 / resolution);
    let rows = floor(400 / resolution);
    let isOnSnake = true;
    while (isOnSnake) {
        let n = Math.round(random(1, 5));
        isOnSnake = false;

        if (n == 1) {
            orange = createVector(floor(random(cols)), floor(random(rows)));
            orange.mult(resolution);
            for (let i = 0; i < snake.body.length; i++) {
                if (orange.x === snake.body[i].x && orange.y === snake.body[i].y) {
                    isOnSnake = true;
                    break;
                }
            }
            apple = 0;
        } else {
            apple = createVector(floor(random(cols)), floor(random(rows)));
            apple.mult(resolution);
            for (let i = 0; i < snake.body.length; i++) {
                if (apple.x === snake.body[i].x && apple.y === snake.body[i].y) {
                    isOnSnake = true;
                    break;
                }
            }
            orange = 0;
        }
    }
}

function draw() {
    background(0);
    snake.update();
    snake.show();

    if (snake.eat(apple)) {
        pickLocation();
    }
    if (snake.eat(orange)) {
        pickLocation();
        shopIsOpen = !shopIsOpen;
        if (shopIsOpen) {
            shop.generateRandomSkins();
        }
    }

    noStroke();
    if (apple != 0) {
        fill(255, 0, 0);
        rect(apple.x, apple.y, resolution, resolution);
    } else {
        fill(230, 110, 20);
        rect(orange.x, orange.y, resolution, resolution);
    }

    // Loja
    if (shopIsOpen) {
        shop.show();
    } else {
        shop.hide();
    }
}

class Snake {
    constructor() {
        this.body = [];
        this.body[0] = createVector(floor(400 / 2), floor(400 / 2));
        this.xdir = 0;
        this.ydir = 0;
        this.skinColor = color(0, 255, 0); // Cor padrão
    }

    setDir(x, y) {
        this.xdir = x;
        this.ydir = y;
    }

    update() {
        let head = this.body[this.body.length - 1].copy();
        this.body.shift();
        head.x += this.xdir * resolution;
        head.y += this.ydir * resolution;
        if (head.x >= 400) {
            head.x = 0;
        } else if (head.x < 0) {
            head.x = 400 - resolution;
        }
        if (head.y >= 400) {
            head.y = 0;
        } else if (head.y < 0) {
            head.y = 400 - resolution;
        }
        this.body.push(head);
    }

    grow() {
        let head = this.body[this.body.length - 1].copy();
        this.body.push(head);
    }

    eat(pos) {
        if (!pos) return false; // Adiciona verificação se pos é nulo
        let x = this.body[this.body.length - 1].x;
        let y = this.body[this.body.length - 1].y;
        if (x === pos.x && y === pos.y) {
            this.grow();
            return true;
        }
        return false;
    }

    show() {
        for (let i = 0; i < this.body.length; i++) {
            fill(this.skinColor); // Usar a cor da skin
            noStroke();
            rect(this.body[i].x, this.body[i].y, resolution, resolution);
        }
    }

    changeSkin(skinColor) {
        this.skinColor = skinColor;
    }

    spendBody(amount) {
        this.body.splice(0, amount);
    }
}

class Shop {
    constructor() {
        this.itemlist = [
            { name: 'Skin Vermelha', color: color(255, 0, 0), cost: 6, available: true },
            { name: 'Skin Azul', color: color(0, 0, 255), cost: 8, available: true },
            { name: 'Skin Amarela', color: color(255, 255, 0), cost: 10, available: true },
            { name: 'Skin Roxa', color: color(128, 0, 128), cost: 5, available: true },
            { name: 'Skin Laranja', color: color(255, 165, 0), cost: 9, available: true },
            { name: 'Skin Rosa', color: color(235,130,200), cost: 7, available: true },
            { name: 'Skin Marrom', color: color(125,45,0), cost: 3, available: true },
            { name: 'Skin Invisível', color: color(0,0,0), cost: -10, available: true },
            { name: 'Skin Branca', color: color(250,250,250), cost: 13, available: true },
            { name: 'Skin Areia', color: color(230,190,125), cost: 13, available: true },
            { name: 'Skin Limão', color: color(115,230,55), cost: 13, available: true },
            { name: 'Skin Azuzin', color: color(190,230,210), cost: 15, available: true },
            { name: 'Skin Ocre', color: color(130,100,0), cost: 3, available: true },
            { name: 'Skin TRansparente', color: color(150,150,150,50), cost: 1, available: true },
            { name: 'Skin cinza', color: color(150,150,150), cost: 6, available: true },
        ];
        this.displayedItems = [];
    }

    generateRandomSkins() {
        this.displayedItems = [];
        // Filtrar apenas os itens disponíveis
        let availableItems = this.itemlist.filter(item => item.available);
        let indices = [];
        while (indices.length < 3 && availableItems.length > 0) {
            let index = floor(random(availableItems.length));
            indices.push(index);
            this.displayedItems.push(availableItems[index]);
            availableItems.splice(index, 1); // Remover o item da lista de itens disponíveis
        }
        // Se não houver itens disponíveis, exibir "Out of Stock"
        if (this.displayedItems.length === 0) {
            this.displayedItems.push({ name: 'Out of Stock', color: color(255), cost: 0 });
        }
    }

    show() {
        fill(150, 150, 150);
        rect(400 - 1, -1, 200 + 2, 400 + 2);
        fill(0, 110, 5);
        textSize(50);
        text(snake.body.length - 1, 450, 70);

        textSize(20);
        for (let i = 0; i < this.displayedItems.length; i++) {
            fill(this.displayedItems[i].color);
            rect(420, 100 + i * 80, 40, 40);
            fill(255);
            text(this.displayedItems[i].name, 470, 130 + i * 80);
            text(`Cost: ${this.displayedItems[i].cost}`, 470, 150 + i * 80);
        }
    }

    hide() {
        fill("white");
        rect(400 - 1, -1, 200 + 2, 400 + 2);
    }

    buyItem(index) {
        let item = this.displayedItems[index];
        // Verificar se o item está disponível
        if (item.available && snake.body.length - 1 >= item.cost) {
            snake.spendBody(item.cost);
            snake.changeSkin(item.color);
            // Marcar o item como indisponível
            item.available = false;
            shopIsOpen = false; // Fechar a loja após a compra
        }
    }    
}

function mouseClicked() {
    if (shopIsOpen) {
        console.log('Mouse Pressed: ', mouseX, mouseY); // Verificar se o evento está sendo acionado
        for (let i = 0; i < shop.displayedItems.length; i++) {
            let itemX = 420;
            let itemY = 100 + i * 80;
            // Ajustar as condições para verificar se o clique do mouse está dentro da área do item
            if (mouseX > itemX && mouseX < itemX + 40 && mouseY > itemY && mouseY < itemY + 40) {
                console.log('Buying item: ', i); // Verificar se a compra do item está sendo registrada
                shop.buyItem(i);
            }
        }
    }
}