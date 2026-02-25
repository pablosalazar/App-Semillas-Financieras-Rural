import Item from "./models/Item";

const GASTOS = "gastos";
const GUSTOS = "gustos";

const offset = 3600;
const offset2 = 7000;
const offset3 = 9800;

export const getItems = (images: HTMLImageElement[]): Item[] => {
  return [
    new Item({
      x: 1000,
      y: 200,
      image: images[3],
      type: GASTOS,
    }),
    new Item({
      x: 1500,
      y: 400,
      image: images[8],
      type: GUSTOS,
    }),
    new Item({
      x: 2000,
      y: 500,
      image: images[9],
      type: GUSTOS,
    }),
    new Item({
      x: 2000,
      y: 0,
      image: images[4],
      type: GASTOS,
    }),
    new Item({
      x: 2300,
      y: 300,
      image: images[5],
      type: GASTOS,
    }),
    new Item({
      x: 2500,
      y: 300,
      image: images[6],
      type: GASTOS,
    }),
    new Item({
      x: 2700,
      y: 450,
      image: images[10],
      type: GUSTOS,
    }),
    new Item({
      x: 3000,
      y: 50,
      image: images[7],
      type: GASTOS,
    }),
    new Item({
      x: 3300,
      y: 450,
      image: images[11],
      type: GUSTOS,
    }),
    new Item({
      x: 3400,
      y: 0,
      image: images[12],
      type: GUSTOS,
    }),

    // SECOND
    new Item({
      x: offset + 400,
      y: 300,
      image: images[3],
      type: GASTOS,
    }),
    new Item({
      x: offset + 800,
      y: 400,
      image: images[8],
      type: GUSTOS,
    }),
    new Item({
      x: offset + 1300,
      y: 200,
      image: images[9],
      type: GUSTOS,
    }),
    new Item({
      x: offset + 1300,
      y: 450,
      image: images[4],
      type: GASTOS,
    }),
    new Item({
      x: offset + 1700,
      y: 300,
      image: images[5],
      type: GASTOS,
    }),
    new Item({
      x: offset + 2000,
      y: 0,
      image: images[6],
      type: GASTOS,
    }),
    new Item({
      x: offset + 2000,
      y: 450,
      image: images[10],
      type: GUSTOS,
    }),
    new Item({
      x: offset + 2200,
      y: 100,
      image: images[7],
      type: GASTOS,
    }),
    new Item({
      x: offset + 2500,
      y: 450,
      image: images[11],
      type: GUSTOS,
    }),
    new Item({
      x: offset + 2500,
      y: 0,
      image: images[12],
      type: GUSTOS,
    }),

    // THIRD
    new Item({
      x: offset2,
      y: 200,
      image: images[10],
      type: GUSTOS,
    }),
    new Item({
      x: offset2 + 500,
      y: 400,
      image: images[6],
      type: GASTOS,
    }),
    new Item({
      x: offset2 + 1000,
      y: 500,
      image: images[9],
      type: GUSTOS,
    }),
    new Item({
      x: offset2 + 1000,
      y: 0,
      image: images[5],
      type: GASTOS,
    }),
    new Item({
      x: offset2 + 1300,
      y: 300,
      image: images[4],
      type: GASTOS,
    }),
    new Item({
      x: offset2 + 1700,
      y: 100,
      image: images[3],
      type: GASTOS,
    }),
    new Item({
      x: offset2 + 1700,
      y: 450,
      image: images[8],
      type: GUSTOS,
    }),
    new Item({
      x: offset2 + 2000,
      y: 50,
      image: images[7],
      type: GASTOS,
    }),
    new Item({
      x: offset2 + 2300,
      y: 400,
      image: images[12],
      type: GUSTOS,
    }),
    new Item({
      x: offset2 + 2400,
      y: 0,
      image: images[11],
      type: GUSTOS,
    }),

    // FOURTH
    new Item({
      x: offset3,
      y: 200,
      image: images[8],
      type: GUSTOS,
    }),
    new Item({
      x: offset3 + 500,
      y: 400,
      image: images[5],
      type: GASTOS,
    }),
    new Item({
      x: offset3 + 1000,
      y: 500,
      image: images[9],
      type: GUSTOS,
    }),
    new Item({
      x: offset3 + 1000,
      y: 0,
      image: images[6],
      type: GASTOS,
    }),
    new Item({
      x: offset3 + 1300,
      y: 300,
      image: images[4],
      type: GASTOS,
    }),
    new Item({
      x: offset3 + 1700,
      y: 100,
      image: images[3],
      type: GASTOS,
    }),
    new Item({
      x: offset3 + 1700,
      y: 450,
      image: images[10],
      type: GUSTOS,
    }),
    new Item({
      x: offset3 + 2000,
      y: 50,
      image: images[7],
      type: GASTOS,
    }),
    new Item({
      x: offset3 + 2300,
      y: 400,
      image: images[12],
      type: GUSTOS,
    }),
    new Item({
      x: offset3 + 2400,
      y: 0,
      image: images[11],
      type: GUSTOS,
    }),
    new Item({
      x: offset3 + 2600,
      y: 300,
      image: images[7],
      type: GASTOS,
    }),
    new Item({
      x: offset3 + 2900,
      y: 400,
      image: images[3],
      type: GASTOS,
    }),
  ];
};

