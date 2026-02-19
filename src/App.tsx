import { useEffect, useState } from "react";
import Textarea from "./components/Textarea";
import bg1 from "./assets/bg-1.jpg";
import bg2 from "./assets/bg-2.jpg";
import bg3 from "./assets/bg-3.jpg";
import bg4 from "./assets/bg-4.jpg";
import Button from "./components/Button";

function App() {
  const [text, setText] = useState<string>("");
  const wallpapers = [bg1, bg2, bg3, bg4];
  const [wallpapersOpen, setWallpapersOpen] = useState<boolean>(false);
  const [currentWallpaper, setCurrentWallpaper] = useState<number>(() => {
    const saved = localStorage.getItem("wallpaper");
    return saved ? Number(saved) : 0;
  });

  useEffect(() => {
    const saved = localStorage.getItem("text");
    if (saved) {
      setText(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("text", text);
  }, [text]);

  useEffect(() => {
    const saved = localStorage.getItem("wallpaper");
    if (saved) setCurrentWallpaper(Number(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("wallpaper", currentWallpaper.toString());
  }, [currentWallpaper]);

  return (
    <div
      className="con"
      style={{
        backgroundImage: `url(${wallpapers[currentWallpaper]})`,
      }}
    >
      
      <Textarea
        placeholder="Write your text here..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <div className="wallpapers-con">
        <Button onClick={() => setWallpapersOpen(!wallpapersOpen)}>
          Wallpapers
        </Button>
        <div
          className={
            !wallpapersOpen ? "wallpapers" : "wallpapers wallpapers-active"
          }
        >
          {wallpapers.map((bg, index) => (
            <img
              src={bg}
              key={index}
              onClick={() => {
                setCurrentWallpaper(index);
                setWallpapersOpen(!wallpapersOpen);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
