export function Video() {
  return (
    <div>
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
        <iframe
          src="https://www.loom.com/embed/7ec16b392ecc42b092b12958036840f8?sid=693f20a2-453b-4df6-b5b4-9d74812a9d3f"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; fullscreen"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></iframe>
      </div>
    </div>
  );
}
