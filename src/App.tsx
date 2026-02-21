import { useEffect, useRef, useState } from "react";
import Textarea from "./components/Textarea";
import bg1 from "./assets/bg-1.jpg";
import bg2 from "./assets/bg-2.jpg";
import bg3 from "./assets/bg-3.jpg";
import bg4 from "./assets/bg-4.jpg";
import Button from "./components/Button";
import {
  AArrowDownIcon,
  AArrowUpIcon,
  BoldIcon,
  ChevronLeftIcon,
  ItalicIcon,
} from "lucide-react";
import Input from "./components/Input";

function App() {
  const wallpapers = [bg1, bg2, bg3, bg4];
  const [text, setText] = useState<string>("");
  const [textSize, setTextSize] = useState<number>(16);
  const [tempTextSize, setTempTextSize] = useState<number>(16);
  const [textSizeOptionsOpen, setTextSizeOptionsOpen] = useState<boolean>(false);
  const [fontStyle, setFontStyle] = useState<string>("normal");
  const [currentFont, setCurrentFont] = useState<string>("Arial");
  const [fontsOptionOpen, setFontsOptionOpen] = useState<boolean>(false);
  const [wallpapersOpen, setWallpapersOpen] = useState<boolean>(false);
  const [currentWallpaper, setCurrentWallpaper] = useState<number>(() => {
    const saved = localStorage.getItem("wallpaper");
    return saved ? Number(saved) : 0;
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.fontSize = `${textSize}px`;
    }
  }, [textSize]);

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

  useEffect(() => {
    setTempTextSize(textSize);
  }, [textSize]);

  return (
    <div
      className="con"
      style={{
        backgroundImage: `url(${wallpapers[currentWallpaper]})`,
      }}
    >
      <div className="editor">
        <div className="options">
          <div className="input-con">
            <Input
              type="number"
              max={96}
              min={2}
              value={tempTextSize}
              onChange={(e) => setTempTextSize(Number(e.target.value))}
              onFocus={() => setTextSizeOptionsOpen(!textSizeOptionsOpen)}
              onBlur={() => {
                (tempTextSize > 96
                  ? setTextSize(96)
                  : tempTextSize < 2
                    ? setTextSize(2)
                    : setTextSize(tempTextSize),
                  setTextSizeOptionsOpen(false));
              }}
            />
            <div className="default-text-sizes">
              <ul style={{ display: textSizeOptionsOpen ? "flex" : "none" }}>
                <li
                  onMouseDown={() => {
                    setTextSize(12);
                    setTempTextSize(12);
                    setTextSizeOptionsOpen(false);
                  }}
                >
                  12
                </li>
                <li
                  onMouseDown={() => {
                    setTextSize(16);
                    setTempTextSize(16);
                    setTextSizeOptionsOpen(false);
                  }}
                >
                  16
                </li>
                <li
                  onMouseDown={() => {
                    setTextSize(24);
                    setTempTextSize(24);
                    setTextSizeOptionsOpen(false);
                  }}
                >
                  24
                </li>
                <li
                  onMouseDown={() => {
                    setTextSize(28);
                    setTempTextSize(28);
                    setTextSizeOptionsOpen(false);
                  }}
                >
                  28
                </li>
                <li
                  onMouseDown={() => {
                    setTextSize(36);
                    setTempTextSize(36);
                    setTextSizeOptionsOpen(false);
                  }}
                >
                  36
                </li>
              </ul>
            </div>
          </div>
          <Button onClick={() => setTextSize(textSize + 1)}>
            <AArrowUpIcon />
          </Button>
          <Button onClick={() => setTextSize(textSize - 1)}>
            <AArrowDownIcon />
          </Button>
          <hr />
          <div
            className="font-select"
            onClick={() => setFontsOptionOpen(!fontsOptionOpen)}
          >
            <div className="current-font">
              {currentFont}
              <ChevronLeftIcon
                size={20}
                style={{
                  transform: `rotate(${fontsOptionOpen ? -90 : 0}deg)`,
                  transition: "transform 0.1s ease",
                }}
              />
            </div>
            <div className="fonts">
              <ul style={{ display: fontsOptionOpen ? "flex" : "none" }}>
                <li onClick={() => setCurrentFont("Arial")}>Arial</li>
                <li onClick={() => setCurrentFont("Cursive")}>Cursive</li>
                <li onClick={() => setCurrentFont("Monospace")}>Monospace</li>
              </ul>
            </div>
          </div>
          <hr />
          <Button
            onClick={() =>
              setFontStyle(fontStyle === "italic" ? "normal" : "italic")
            }
            style={{
              backgroundColor:
                fontStyle === "italic" ? "#ffffff40" : "#ffffff1b",
            }}
          >
            <ItalicIcon />
          </Button>
          <Button
            onClick={() =>
              setFontStyle(fontStyle === "bold" ? "normal" : "bold")
            }
            style={{
              backgroundColor: fontStyle === "bold" ? "#ffffff40" : "#ffffff1b",
            }}
          >
            <BoldIcon />
          </Button>
        </div>
        <Textarea
          placeholder="Write your text here..."
          onChange={(e) => setText(e.target.value)}
          style={{
            fontFamily: currentFont,
            fontStyle: fontStyle,
            fontWeight: fontStyle,
          }}
          value={text}
          ref={textareaRef}
        />
      </div>

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
