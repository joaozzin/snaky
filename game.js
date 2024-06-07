let snake;
let shop;
let resolution = 20;
let food;

function setup() {
    createCanvas(600, 400);
    snake = new Snake();
    shop = new Shop();
    food = createSprite(-10,-10,resolution,resolution);
    frameRate(10);
    pickLocation(1);

    // shop.show();
}

function pickLocation(x) {
    let cols = floor(400 / resolution);
    let rows = floor(400 / resolution);
    let isOnSnake = true;

    
    while (isOnSnake) {
        let n;
        if(x){
            switch (x) {
                case 1:
                    n = 1;
                    break;
            }
        }
        else{
            n = Math.round(random(1, 5));
        }
        isOnSnake = false;
        food.position.x = floor(random(cols)) * resolution + resolution / 2;
        food.position.y = floor(random(rows)) * resolution + resolution / 2;

        for (let i = 0; i < snake.body.length; i++) {
            if (food.position.x === snake.body[i].position.x && food.position.y === snake.body[i].position.y) {
                isOnSnake = true;
                break;
            }
        }
        food.shapeColor = (n == 1) ? "#FF9A00" : "#DE1C16";
    }
}

function draw() {
    background(0);
    snake.tp();
    snake.eat();
    snake.gkd();
    shop.gkd();
    shop.ctrlDepth();
    snake.update();
    drawSprites();
    shop.draw();
}

class Snake {
    constructor() {
        this.sprite = createSprite(210, 210, resolution, resolution);
        this.bc = color(0,250,0);
        this.sprite.shapeColor = this.bc;
        this.direction = createVector(0,0);
        this.body = [this.sprite];
        this.speed = resolution;
    }

    gkd(){
        let speed = this.speed;

        if(keyWentDown("up")){
            this.direction.y = -speed;
            this.direction.x = 0;
        }
        else if(keyWentDown("down")){
            this.direction.y = speed;
            this.direction.x = 0;
        }
        else if(keyWentDown("left")){
            this.direction.x = -speed;
            this.direction.y = 0;
        }
        else if(keyWentDown("right")){
            this.direction.x = speed;
            this.direction.y = 0;
        }
    }
    update(){
        let lbp = this.body[this.body.length-1];
        let head = this.body[0];
        // console.log(head);
        // console.log(this.body)

        lbp.x = head.x + this.direction.x ;
        lbp.y = head.y+ this.direction.y;
        this.body.pop();
        this.body.reverse();
        this.body.push(lbp);
        this.body.reverse();
        // console.log(this.body);
    }
    eat(){
        let head = this.body[0];

        if (head.overlap(food)) {
            if (food.shapeColor == "#DE1C16") {
                pickLocation();
                this.grow(1);
            } else if (food.shapeColor == "#FF9A00") {
                pickLocation();
                (shop.open)? shop.hide():shop.show();
            }
        }
    }
    tp() {
        for (let a in this.body) {
            let snk = this.body[a];
            if (snk.position.x < 0) snk.position.x = 390;
            if (snk.position.x > 400) snk.position.x = 10;
            if (snk.position.y < 0) snk.position.y = 390;
            if (snk.position.y > 400) snk.position.y = 10;
        }
    }
    grow(x) {
        for (let i = 0; i < x; i++) {
            let head = this.body.slice(0,1)[0];
            // console.log(head);
            let bp = createSprite(head.x,head.y,resolution,resolution);
            bp.shapeColor = this.bc;
            this.body.push(bp);
        }
    }
    shrink(x){
        for(let a = 0;a<x;a++){
            this.body.slice(-1)[0].remove();
            this.body.pop();
        }
    }
    setbc(x){
        for(let a of this.body){
            a.shapeColor = x;
            this.bc = x;
        }
    }
}

class Shop{
    constructor(){
        this.bg = createSprite(500,200,200,400);
        this.bg.shapeColor = "white";
        this.bg.depth = 2;
        this.lc = "white";                                                             //botar verde escuro
        this.open = false;
        this.bc = [
            {color: color(0,250,0)       ,price:0 ,adquired:true ,name:"verde"},
            {color: color(250,170,0)     ,price:10,adquired:false,name:"laranja"},
            {color: color(250,0,0)       ,price:10,adquired:false,name:"vermelho"},
            {color: color(65,255,250)    ,price:10,adquired:false,name:"azulzin"},
            {color: color(90,90,90)      ,price:10,adquired:false,name:"cinzin"},
            {color: color(250,250,250)   ,price:10,adquired:false,name:"branco"},
            {color: color(220,75,170)    ,price:10,adquired:false,name:"pink"},
            {color: color(220,150,150)   ,price:10,adquired:false,name:"sakura"},
            {color: color(220,90,80)     ,price:10,adquired:false,name:"salmão"},
            {color: color(0,0,250)       ,price:10,adquired:false,name:"azul"},
            {color: color(255,255,0)     ,price:10,adquired:false,name:"amarela"},
            {color: color(128,0,128)     ,price:10,adquired:false,name:"roxa"},
            {color: color(125,45,0)      ,price:10,adquired:false,name:"marron"},
            {color: color(230,190,125)   ,price:10,adquired:false,name:"areia"},
            {color: color(115,230,55)    ,price:10,adquired:false,name:"limão"},
            {color: color(130,100,0)     ,price:10,adquired:false,name:"ocre"},
            {color: color(0,0,0)         ,price:10,adquired:false,name:"invisível"},//meio fio
            {color: color(0,250,0,50)    ,price:0 ,adquired:false,name:"TRverde"},
            {color: color(250,170,0,50)  ,price:10,adquired:false,name:"TRlaranja"},
            {color: color(250,0,0,50)    ,price:10,adquired:false,name:"TRvermelho"},
            {color: color(65,255,250,50) ,price:10,adquired:false,name:"TRazulzin"},
            {color: color(90,90,90,50)   ,price:10,adquired:false,name:"TRcinzin"},
            {color: color(250,250,250,50),price:10,adquired:false,name:"TRbranco"},
            {color: color(220,75,170,50) ,price:10,adquired:false,name:"TRpink"},
            {color: color(220,150,150,50),price:10,adquired:false,name:"TRsakura"},
            {color: color(220,90,80,50)  ,price:10,adquired:false,name:"TRsalmão"},
            {color: color(0,0,250,50)    ,price:10,adquired:false,name:"TRazul"},
            {color: color(255,255,0,50)  ,price:10,adquired:false,name:"TRamarela"},
            {color: color(128,0,128,50)  ,price:10,adquired:false,name:"TRoxa"},
            {color: color(125,45,0,50)   ,price:10,adquired:false,name:"TRmarron"},
            {color: color(230,190,125,50),price:10,adquired:false,name:"TRareia"},
            {color: color(115,230,55,50) ,price:10,adquired:false,name:"TRlimão"},
            {color: color(130,100,0,50)  ,price:10,adquired:false,name:"TRocre"},
        ]                                                                              //colocar preços
        this.onStock = [];
    }
    hide(){
        this.bg.shapeColor = "white";
        this.lc = "white";
        this.open = false;
        for(let a of this.onStock){
            a.sprite.depth = 10000000;
            a.sprite.remove();
        }
        this.onStock = [];
    }
    show(){
        this.bg.shapeColor = "gray";
        this.lc = "red";
        this.open = true;
        this.chooseSkins();
    }
    ctrlDepth(){
        let bigdepth = this.bg.depth;
        for(let a of snake.body){
            // console.log(a);
            if(a.depth > bigdepth){
                bigdepth = a.depth + 1;
            }
        }
        this.bg.depth = bigdepth;

        for (let item of this.onStock) {
            item.sprite.depth = bigdepth + 2;
        }
    }
    chooseSkins(){
        let array = [];
        let array2 = [];
        for(let a of this.bc){
            if(!a.adquired){
                array.push(a);
            }
        }
        // console.log(array);
        for(let a = 3;a>0;a--){
            let rnd = Math.round(random(0,array.length-1));
            array2.push(array[rnd]);
            array.splice(rnd,1);
        }
        // console.log(array2);
        for(let a in array2){
            if(array2[a] != undefined){
                let osa = {};
                osa = array2[a];
                // console.log(osa);
                let spr = createSprite(450,100 + a*100,50,50);
                spr.shapeColor = osa.color;
                this.onStock.push({color:osa.color,price:osa.price,adquired:false,sprite:spr,name:osa.name});
            }
        }
        // console.log(this.onStock);
        if(this.onStock.length == 0){
            let spr = createSprite(450,100,50,50);
            spr.shapeColor = "white";
            this.onStock.push({color:"white",price:0,adquired:false,sprite:spr,name:"OOS"});
        }
    }
    draw(){
        push();
            fill(this.lc);
            textSize(50);
            textAlign(CENTER);
            text(snake.body.length - 1,500,50);
        pop();
        push();
            fill("white")
            textSize(25);
            for(let a in this.onStock){
                text(this.onStock[a].name,500-15,100-5 + 100*a)
                text("Custa:"+this.onStock[a].price,500-15,100+25 + 100*a)
            }
        pop();
    }
    getclicks(){
        for(let a of this.onStock){
            if(mouseIsOver(a.sprite) && snake.body.length-1 >= a.price && this.open){
                this.buy(a);
            }
        }
    }
    gkd(){
        for(let n = 1;n < 4;n++){
            if(keyWentDown(""+n)){
                let a = this.onStock[n-1]
                if(a){
                    if(snake.body.length-1 >= a.price && this.open){
                        this.buy(a);
                    }
                }
            }
        }
    }
    buy(x){
        // console.log("comprou " + x.name);
        snake.shrink(x.price);
        snake.setbc(x.color);
        for(let b in this.bc){
            if(this.bc[b].color == x.color){
                this.bc[b].adquired = true;
            }
        }
        shop.hide();
    }
}

function mouseClicked(){
    shop.getclicks();
    // console.log("clicou");
}