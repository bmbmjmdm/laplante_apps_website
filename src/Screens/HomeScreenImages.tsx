import React, { FunctionComponent, useState, MutableRefObject } from "react";
import { PlayfulPhone, SlideshowPhone } from "../Components";
import iadventure from "../assets/iadventure.gif";
import npcg from "../assets/npcg_short.gif";
import dice from "../assets/dice.gif";
import virta from "../assets/virta_short.gif";
import weread from "../assets/weread_short.gif";
import hearyouout from "../assets/hearyouout_short.gif";
import sushimonster from "../assets/sushimonster_short.gif";
import cat1 from "../assets/cat1.png";
import cat2 from "../assets/cat2.png";
import cat3 from "../assets/cat3.png";
import cat4 from "../assets/cat4.png";
import cat5 from "../assets/cat5.png";
import cat6 from "../assets/cat6.png";
import cat7 from "../assets/cat7.png";
import cat8 from "../assets/cat8.png";
import cat9 from "../assets/cat9.png";
import cat10 from "../assets/cat10.png";
import cat11 from "../assets/cat11.png";
import cat12 from "../assets/cat12.png";
import cat13 from "../assets/cat13.png";
import cat14 from "../assets/cat14.png";
import cat15 from "../assets/cat15.png";

type HomeScreenImagesProps = {
  catMode: MutableRefObject<number>;
};

// This component is responsible for animating in the phone (PlayfulPhone half) and then cycling through
// the various gifs or images (SlideshowPhone half). It does the handoff using two different state variables to assure no flickering
// It accepts a ref to determine which list of assets to use
// If catmode is enabled (1), it'll show cat pictures. Otherwise it'll show app gifs
export const HomeScreenImages: FunctionComponent<HomeScreenImagesProps> = ({
  catMode,
}) => {
  const [phoneDone, setPhoneDone] = useState(false);
  const [phoneCycling, setPhoneCycling] = useState(false);

  return (
    <>
      {!phoneCycling && (
        <PlayfulPhone onAnimationComplete={() => setPhoneDone(true)} />
      )}
      {phoneDone && (
        <SlideshowPhone
          pictureLists={[appPictures, catPictures]}
          curListRef={catMode}
          onFirstCycleComplete={() => setPhoneCycling(true)}
        />
      )}
    </>
  );
};

const appPictures = [
  dice,
  hearyouout,
  virta,
  sushimonster,
  iadventure,
  weread,
  npcg,
];

const catPictures = [
  cat14,
  cat15,
  cat1,
  cat2,
  cat3,
  cat4,
  cat5,
  cat6,
  cat7,
  cat8,
  cat9,
  cat10,
  cat11,
  cat12,
  cat13,
];
