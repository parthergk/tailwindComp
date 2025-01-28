import { useState, useRef } from "react";

function App() {
  const isDragging = useRef(false);
  const [translateX, setTranslateX] = useState(187.5);
  const startX = useRef(0);

  const containerWidth = 375;
  const barWidth = 4;

  const handleStart = (clientX) => {
    isDragging.current = true;
    startX.current = clientX - translateX;
  };

  const handleMove = (clientX) => {
    if (isDragging.current) {
      const newTranslateX = clientX - startX.current;
      const constrainedX = Math.max(
        0,
        Math.min(newTranslateX, containerWidth - barWidth)
      );
      setTranslateX(constrainedX);
    }
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  // Mouse event handlers
  const handleMouseDown = (e) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    handleStart(touch.clientX);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleMove(touch.clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  return (
    <>
      <div className="bg-[#030712] p-5 h-screen w-screen flex justify-center items-center m-auto">
        <div className="h-112 p-4 sm:p-8 relative overflow-hidden rounded-lg border border-gray-800 bg-gray-950/[2.5%] bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-white)]/10">
          <div
            className="w-full overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="absolute inset-y-0 z-10 w-1 bg-sky-400 cursor-ew-resize"
              style={{ transform: `translateX(${translateX}px)` }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            ></div>
            <div className="isolate flex h-full w-full items-center justify-center">
              <div className="h-[30.5rem] w-[375px] relative grid grid-cols-1 grid-rows-1 overflow-hidden rounded-t-4xl bg-gray-950/10 outline outline-gray-950/10 dark:outline-white/10">
                <div className="col-start-1 row-start-1">
                  <img
                    src="/img/light.png"
                    className={`absolute inset-0`}
                    alt="Light"
                    style={{
                      clip: `rect(0px, ${translateX - 1}px, 488px, 0px)`,
                    }}
                  />
                </div>
                <div className="col-start-1 row-start-1">
                  <img src="/img/dark.png" alt="Dark" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
