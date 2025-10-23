const interiorData = [
  {
    id: 1,
    name: "Leather seats",
    img: "https://m.media-amazon.com/images/I/81fJPqpC7fL.jpg",
    cost: 1200
  },
  {
    id: 2,
    name: "Fabric seats",
    img: "https://m.media-amazon.com/images/I/71X00Lx2C2L.jpg",
    cost: 600
  },
  {
    id: 3,
    name: "Alcantara trim",
    img: "https://t3.ftcdn.net/jpg/03/09/06/96/360_F_309069678_1LhIokQJS60Qzla0kOOVX4p8PFYmn38f.jpg",
    cost: 1400
  }
];

const exteriorData = [
  {
    id: 1,
    name: "Metallic Blue paint",
    img: "https://cdn11.bigcommerce.com/s-2els0ljzy6/images/stencil/500x500/products/7936/7928/WA227M__87366.1727385539.jpg?c=1",
    cost: 900
  },
  {
    id: 2,
    name: "Matte Black paint",
    img: "https://img.freepik.com/premium-photo/black-metal-background-texture_177821-136.jpg",
    cost: 1000
  },
  {
    id: 3,
    name: "Pearl White paint",
    img: "https://t3.ftcdn.net/jpg/01/67/22/80/360_F_167228066_g5mIEN9Cwmm10KuyHG9siVmNdFuRDrlk.jpg",
    cost: 1100
  }
];

const roofData = [
  {
    id: 1,
    name: "Panoramic sunroof",
    img: "https://images.ctfassets.net/i874q3cs1cvx/55329/08a00f2baf2901e6140562e7f4e8721f/GettyImages-932512044.jpg",
    cost: 1500,
    convertible: false
  },
  {
    id: 2,
    name: "Standard roof",
    img: "https://www.shutterstock.com/image-photo/roof-on-silver-car-600nw-2403600329.jpg",
    cost: 0,
    convertible: false
  },
  {
    id: 3,
    name: "Carbon fiber roof",
    img: "https://ind-distribution.com/cdn/shop/products/46986808241_10c6ed167e_k.jpg?v=1735922774",
    cost: 2000,
    convertible: false
  },
  {
    id: 4,
    name: "Convertible roof",
    img: "https://chucksconvertibleparts.com/images/T198661493.jpg",
    cost: 3000,
    convertible: true
  }
];

const wheelsData = [
  {
    id: 1,
    name: "19-inch alloy wheels",
    img: "https://m.media-amazon.com/images/I/71LmpXEUrTL._AC_UF894,1000_QL80_.jpg",
    cost: 800
  },
  {
    id: 2,
    name: "18-inch steel wheels",
    img: "https://m.media-amazon.com/images/I/91rDD2vg2QL.jpg",
    cost: 500
  },
  {
    id: 3,
    name: "20-inch chrome wheels",
    img: "https://m.media-amazon.com/images/I/714b1KbsnGL.jpg",
    cost: 1200
  }
];

export default {
    interiorData,
    exteriorData,
    roofData,
    wheelsData
}