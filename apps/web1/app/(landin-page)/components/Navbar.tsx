export default function Navbar() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[1200px] flex justify-between p-4">
        <div className="text-white">DrawSync</div>
        <div className="text-white flex gap-10">
          <div>About</div>
          <div>Features</div>
          <div>Pricing</div>
        </div>
      </div>
    </div>
  );
}
