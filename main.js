const canvas = document.getElementById("myCanvas");
canvas.width = 750;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.95);
const car = new Car(road.getLaneCenter(2), 125, 30, 50, "keys");
const traffic = [];

animate();

function animate() {
  if (Math.random() < 1 / 30) {
    const laneIndex = Math.floor(Math.random() * road.laneCount);
    const laneCenter = road.getLaneCenter(laneIndex);
    const newCarY = car.y - 1000;
    const newCar = new Car(laneCenter, newCarY, 30, 50, "minon", 17);

    const overlappingCars = traffic.filter(
      (existingCar) =>
        Math.abs(existingCar.x - newCar.x) < car.width &&
        Math.abs(existingCar.y - newCar.y) < car.height
    );

    if (overlappingCars.length === 0) {
      traffic.push(newCar);
    }
  }

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  car.update(road.borders, traffic);

  canvas.height = window.innerHeight;

  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.8);

  road.draw(ctx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx, "red");
  }

  car.draw(ctx, "blue");
  ctx.restore();
  requestAnimationFrame(animate);
}

function refreshPage() {
  location.reload();
}
