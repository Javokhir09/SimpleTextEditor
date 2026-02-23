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
  TextAlignCenterIcon,
  TextAlignEndIcon,
  TextAlignJustifyIcon,
  TextAlignStartIcon,
} from "lucide-react";
import Input from "./components/Input";
import type { Fonts, TextAlignments } from "./types";
import { initKeyboardEngine, playKeySound } from "./audio/keyboardSound";
import jsPDF from "jspdf";

function App() {
  const wallpapers = [bg1, bg2, bg3, bg4];
  const [text, setText] = useState<string>("");
  const [textSize, setTextSize] = useState<number>(16);
  const [tempTextSize, setTempTextSize] = useState<number>(16);
  const [textSizeOptionsOpen, setTextSizeOptionsOpen] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [currentFont, setCurrentFont] = useState<Fonts>("Roboto");
  const [fontsOptionOpen, setFontsOptionOpen] = useState<boolean>(false);
  const [wallpapersOpen, setWallpapersOpen] = useState<boolean>(false);
  const [currentWallpaper, setCurrentWallpaper] = useState<number>(() => {
    const saved = localStorage.getItem("wallpaper");
    return saved ? Number(saved) : 0;
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const [textAlignment, setTextAlignment] = useState<TextAlignments>("left");
  const [exportOptionsOpen, setExportOptionsOpen] = useState<boolean>(false);

  useEffect(() => {
    initKeyboardEngine();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const keyCode = (e.nativeEvent as KeyboardEvent).keyCode.toString();
    playKeySound(keyCode);
  };

  const exportAsTxt = (text: string) => {
    const blob = new Blob([text], {type: "text/plain"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "my_text.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  const exportAsPdf = (text: string) => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 10, 10);
    doc.save("file.pdf");
  }

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
                <li onClick={() => setCurrentFont("Roboto")}>Roboto</li>
                <li onClick={() => setCurrentFont("Gluten")}>Gluten</li>
                <li onClick={() => setCurrentFont("Birthstone")}>Birthstone</li>
                <li onClick={() => setCurrentFont("Orbitron")}>Orbitron</li>
                <li onClick={() => setCurrentFont("Faustina")}>Faustina</li>
              </ul>
            </div>
          </div>
          <hr />
          <Button
            onClick={() => setIsItalic(!isItalic)}
            style={{
              backgroundColor: isItalic ? "#ffffff50" : "#ffffff1b",
            }}
          >
            <ItalicIcon />
          </Button>
          <Button
            onClick={() => setIsBold(!isBold)}
            style={{
              backgroundColor: isBold ? "#ffffff50" : "#ffffff1b",
            }}
          >
            <BoldIcon />
          </Button>
          <hr />
          <Button
            onClick={() => setTextAlignment("right")}
            style={{
              backgroundColor:
                textAlignment === "right" ? "#ffffff50" : "#ffffff1b",
            }}
          >
            <TextAlignEndIcon />
          </Button>
          <Button
            onClick={() => setTextAlignment("center")}
            style={{
              backgroundColor:
                textAlignment === "center" ? "#ffffff50" : "#ffffff1b",
            }}
          >
            <TextAlignCenterIcon />
          </Button>
          <Button
            onClick={() => setTextAlignment("left")}
            style={{
              backgroundColor:
                textAlignment === "left" ? "#ffffff50" : "#ffffff1b",
            }}
          >
            <TextAlignStartIcon />
          </Button>
          <Button
            onClick={() => setTextAlignment("justify")}
            style={{
              backgroundColor:
                textAlignment === "justify" ? "#ffffff50" : "#ffffff1b",
            }}
          >
            <TextAlignJustifyIcon />
          </Button>
        </div>
        <Textarea
          placeholder="Write your text here..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            fontFamily: currentFont,
            fontStyle: isItalic ? "italic" : "normal",
            fontWeight: isBold ? "bold" : "normal",
            textAlign:
              textAlignment === "left"
                ? "left"
                : textAlignment === "center"
                  ? "center"
                  : textAlignment === "right"
                    ? "right"
                    : textAlignment === "justify"
                      ? "justify"
                      : "left",
          }}
          value={text}
          ref={textareaRef}
        />
      </div>
      <div className="export">
        <p onClick={() => setExportOptionsOpen(!exportOptionsOpen)}>Export <ChevronLeftIcon size={20} style={{
                  transform: `rotate(${exportOptionsOpen ? 90 : 0}deg)`,
                  transition: "transform 0.1s ease",
                }} /></p>
        <div className="options">
          <ul style={{display: exportOptionsOpen ? "flex" : "none"}}>
            <li onClick={() => exportAsTxt(text)}>Export as <span>.txt</span></li>
            <li onClick={() => exportAsPdf(text)}>Export as <span>.pdf</span></li>
          </ul>
        </div>
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
      <div className="word-count">Words: {wordCount}</div>
    </div>
  );
}

export default App;
