// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;  
}

Ball.prototype.draw = function() {
    ctx.beginPath(); // usamos isso para declarar que queremos desenhar uma forma no papel.
    ctx.fillStyle = this.color;
    //usamos 'fillStyle' para definir a cor que queremos que a forma seja — nós a definimos como a propriedade color da nossa bola.
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    /*
    usamos o método  arc() para traçar uma forma de arco no papel. Seus parâmetros são:
    A posição x e y do centro do arco — estamos especificando as propriedades x e y da nossa bola.
    O raio do nosso arco — estamos especificando a propriedade size  da nossa bola.
    Os dois últimos parâmetros especificam o número inicial e final de graus em volta do círculo em que o arco é desenhado entre eles. Aqui nós especificamos 0 graus e 2 * PI, que é o equivalente a 360 graus em radianos (irritantemente, você tem que especificar isso em radianos). Isso nos dá um círculo completo. Se você tivesse especificado apenas 1 * PI, você obteria um semicírculo (180 graus).*/

    ctx.fill();//Esse metodo basicamente termina de desenhar a bola definida em beginPath() na cor definida em fillStyle
}

Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }
  Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
        }
      }
    }
  }

let balls = []
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
  
    while (balls.length < 25) {
      let size = random(10,20);
      let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size,width - size),
        random(0 + size,height - size),
        random(-7,7),
        random(-7,7),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        size
      );
      balls.push(ball);
    }
  
    for (let i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  
    requestAnimationFrame(loop);
  }

loop()
