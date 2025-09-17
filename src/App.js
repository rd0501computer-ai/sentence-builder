import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./index.css";

// 블록 종류 정의
const BLOCK_TYPES = {
  NOUN: "NOUN",
  VERB: "VERB",
  ADJ: "ADJ",
  PREP: "PREP",
};

// 예시 블록 데이터
const blocksData = {
  NOUN: ["He", "She", "It", "Clock", "Door"],
  VERB: ["runs", "opens", "closes", "reads", "writes"],
  ADJ: ["big", "small", "red", "blue"],
  PREP: ["on", "in", "under", "with"],
};

// 드래그 가능한 블록 컴포넌트
function Block({ type, text }) {
  const [, drag] = useDrag(() => ({
    type,
    item: { text, type },
  }));
  const colorMap = {
    NOUN: "#FFADAD",
    VERB: "#FFD6A5",
    ADJ: "#FDFFB6",
    PREP: "#CAFFBF",
  };
  return (
    <div
      ref={drag}
      className="p-2 m-1 rounded cursor-move text-center"
      style={{ backgroundColor: colorMap[type], minWidth: "60px" }}
    >
      {text}
    </div>
  );
}

// 드롭 가능한 자리
function Slot({ accept, onDrop, children }) {
  const [, drop] = useDrop(() => ({
    accept,
    drop: (item) => onDrop(item),
  }));
  return (
    <div
      ref={drop}
      className="p-2 m-1 rounded border-2 border-dashed min-w-[70px] min-h-[40px] flex items-center justify-center"
    >
      {children}
    </div>
  );
}

// 메인 앱
function App() {
  const [sentence, setSentence] = useState({
    subject: null,
    verb: null,
    object: null,
    prep: null,
  });

  const handleDrop = (slot) => (item) => {
    setSentence((prev) => ({ ...prev, [slot]: item.text }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        <h1 className="text-2xl mb-4">Sentence Builder</h1>

        <div className="flex mb-4">
          <Slot accept={BLOCK_TYPES.NOUN} onDrop={handleDrop("subject")}>
            {sentence.subject}
          </Slot>
          <Slot accept={BLOCK_TYPES.VERB} onDrop={handleDrop("verb")}>
            {sentence.verb}
          </Slot>
          <Slot accept={BLOCK_TYPES.NOUN} onDrop={handleDrop("object")}>
            {sentence.object}
          </Slot>
          <Slot accept={BLOCK_TYPES.PREP} onDrop={handleDrop("prep")}>
            {sentence.prep}
          </Slot>
        </div>

        <div className="flex flex-wrap border-t pt-2">
          {Object.keys(blocksData).map((type) =>
            blocksData[type].map((text) => (
              <Block key={text} type={type} text={text} />
            ))
          )}
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
