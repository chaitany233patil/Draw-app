interface Props {
  zoomOut: () => void;
  zoomIn: () => void;
  scale: number;
}

export function ZoomInOutPanel({ zoomIn, zoomOut, scale }: Props) {
  return (
    <div className="absolute bottom-5 left-10 text-white hidden sm:flex items-center gap-1 bg-[#232329] rounded-lg p-1">
      <button className="h-8 w-8 cursor-pointer" onClick={zoomOut}>
        -
      </button>
      <div className="text-xs w-14 text-center">{scale}%</div>
      <button className="h-8 w-8 cursor-pointer" onClick={zoomIn}>
        +
      </button>
    </div>
  );
}
