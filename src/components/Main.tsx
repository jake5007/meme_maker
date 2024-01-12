import { useEffect, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import dice from "/icon-dice.svg";

const getData = async () => {
  try {
    const res = await axios.get("https://api.memegen.link/templates/");
    const data = res.data;

    return data;
  } catch (err) {
    console.log(err);
  }
};

const saveImg = () => {
  const target = document.getElementById("meme");

  if (!target) return alert("it failed! Try again.");

  html2canvas(target, { logging: true, useCORS: true, allowTaint: false }).then(
    (canvas) => {
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.href = canvas.toDataURL("image/png");
      link.download = "result.png";
      link.click();
      document.body.removeChild(link);
    }
  );
};

const Main = () => {
  const [topText, setTopText] = useState(() => "write");
  const [bottomText, setBottomText] = useState(() => "something");
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    randImgSetting();
  }, []);

  const randImgSetting = async () => {
    const data = await getData();
    const rand = Math.floor(Math.random() * data.length);
    const randImg = data[rand].blank;

    setImgSrc(randImg);
  };

  const handleDiceClick = () => {
    randImgSetting();
  };

  const handleSaveImg = async () => {
    saveImg();
  };

  return (
    <main className="min-h-[80vh] max-w-[1480p] mx-auto py-10 px-5">
      <section className="flex flex-col items-center gap-7 mb-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:justify-center text-2xl">
          <div>
            <label htmlFor="top" className="font-bold">
              Top
            </label>
            <input
              id="top"
              type="text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              className="ml-3"
              placeholder="Write something..."
            />
          </div>
          <div>
            <label htmlFor="bottom" className="font-bold">
              Bottom
            </label>
            <input
              id="bottom"
              type="text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              className="ml-3"
              placeholder="Write something..."
            />
          </div>
        </div>
        <button
          className="w-[70px] h-[70px] rounded-full bg-orange-400 relative hover:shadow-[0_0_20px_10px_rgb(251,146,60,0.6)]"
          onClick={handleDiceClick}
        >
          <img
            src={dice}
            alt="dice"
            className="w-[35px] h-[35px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </button>
      </section>
      <div
        id="meme"
        className="relative container mx-auto flex w-full justify-center"
      >
        <p className="meme-text absolute top-2 text-5xl uppercase tracking-wide">
          {topText}
        </p>
        <img src={imgSrc} alt="random meme image" />
        <p className="meme-text absolute bottom-3 text-5xl uppercase tracking-wide">
          {bottomText}
        </p>
      </div>
      <div className="flex justify-center w-full mt-5">
        <button
          className="w-full sm:w-auto py-4 px-8 font-bold text-xl tracking-wider bg-gradient-to-br from-[#FF8C00] via-[#FFB74D] to-[#FFD180] rounded-lg hover:shadow-[0_0_20px_10px_rgb(251,146,60,0.5)]"
          onClick={handleSaveImg}
        >
          Save
        </button>
      </div>
    </main>
  );
};
export default Main;
