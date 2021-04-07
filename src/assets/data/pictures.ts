import Bali1 from "../images/gallery/bali1.jpg";
import Bali2 from "../images/gallery/bali2.jpg";
import Bali3 from "../images/gallery/bali3.jpg";
import Bali4 from "../images/gallery/bali4.jpg";
import Bali5 from "../images/gallery/bali5.jpg";
import Bali6 from "../images/gallery/bali6.jpg";
// import Bali7 from "../images/gallery/bali7.jpg";
import Bangkok1 from "../images/gallery/bangkok1.jpg";
import Dubai1 from "../images/gallery/dubai1.jpg";
import Dubai2 from "../images/gallery/dubai2.jpg";
import Dubai3 from "../images/gallery/dubai3.jpg";
import Dubai4 from "../images/gallery/dubai4.jpg";
import Jordan1 from "../images/gallery/jordan1.jpg";
// import Jordan2 from "../images/gallery/jordan2.jpg";
import Jordan3 from "../images/gallery/jordan3.jpg";
import Jordan4 from "../images/gallery/jordan4.jpg";
// import Jordan5 from "../images/gallery/jordan5.jpg";
import Jordan6 from "../images/gallery/jordan6.jpg";
import Jordan7 from "../images/gallery/jordan7.jpg";
import Jordan8 from "../images/gallery/jordan8.jpg";
import Jordan9 from "../images/gallery/jordan9.jpg";
import Jordan10 from "../images/gallery/jordan10.jpg";
// import Jordan11 from "../images/gallery/jordan11.jpg";
// import Jordan12 from "../images/gallery/jordan12.jpg";
import Krabi1 from "../images/gallery/krabi1.jpg";
import Krabi2 from "../images/gallery/krabi2.jpg";
import Krabi3 from "../images/gallery/krabi3.jpg";
import Krabi4 from "../images/gallery/krabi4.jpg";
import { vw } from "../../@utils/useScrollPosition";
import { Picture } from "../../@types";

const SIZE_THRESHOLD = 1200;

export const pictures: Array<Picture> = [
  {
    img: Bali1,
    title: "Tekad Cepung Waterfall, Bangli",
    cols: 1
  },
  {
    img: Bali2,
    title: "Broken Bridge, Nusa Penida Island",
    cols: vw < SIZE_THRESHOLD ? 1 : 2
  },
  {
    img: Jordan1,
    title: "Ad-Deir Monastery, Petra",
    cols: 1
  },
  {
    img: Dubai1,
    title: "Burj Khalifa, Downtown Dubai",
    cols: 1
  },
  {
    img: Jordan8,
    title: "Dead Sea, Dead Sea Highway",
    cols: 1
  },
  {
    img: Jordan4,
    title: "Street of Facades, Petra",
    cols: 1
  },
  {
    img: Bali6,
    title: "Mt. Batur Summit, Bangli",
    cols: vw < SIZE_THRESHOLD ? 1 : 2
  },
  {
    img: Bali5,
    title: "Gates of Heaven, Mt. Lempuyang, Karangasem",
    cols: 1
  },
  {
    img: Bangkok1,
    title: "Bangkok Night View, Sukhumvit",
    cols: vw < SIZE_THRESHOLD ? 1 : 2
  },
  {
    img: Jordan7,
    title: "Wadi Musa, Ma'an",
    cols: 1
  },
  {
    img: Krabi4,
    title: "Ko Hong Lagoon, Hong Islands",
    cols: 1
  },
  {
    img: Krabi3,
    title: "Diamond Cave, Railay Beach",
    cols: 1
  },
  {
    img: Dubai2,
    title: "Desert Dunes, Lehbab Desert",
    cols: 1
  },
  {
    img: Bali3,
    title: "Kelingking Beach, Nusa Penida",
    cols: vw < SIZE_THRESHOLD ? 1 : 2
  },
  {
    img: Jordan10,
    title: "As Siq, Petra",
    cols: 1
  },
  {
    img: Dubai3,
    title: "Desert Sunset, Lehbab Desert",
    cols: 1
  },
  {
    img: Jordan6,
    title: "Al Balad, Amman",
    cols: vw < SIZE_THRESHOLD ? 1 : 2
  },
  {
    img: Dubai4,
    title: "Desert Camp, Lehbab Desert",
    cols: 1
  },
  {
    img: Bali4,
    title: "Lempuyang Temple, Mt. Lempuyang, Karangasem",
    cols: vw < SIZE_THRESHOLD ? 1 : 2
  },
  {
    img: Krabi2,
    title: "Krabi Town, Mueang",
    cols: 1
  },
  {
    img: Jordan3,
    title: "Djin Blocks, Petra",
    cols: vw < SIZE_THRESHOLD ? 1 : 2
  },
  {
    img: Krabi1,
    title: "Beachside, Ao Nang Beach",
    cols: 1
  },
  {
    img: Jordan9,
    title: "Great Temple, Petra",
    cols: 1
  },
];