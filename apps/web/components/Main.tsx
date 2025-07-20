"use client";

import { useState } from "react";

export function Main() {
  const [rooms, setRooms] = useState([
    { id: "room_001", name: "Design Brainstorm", createdAt: "2025-07-20" },
    { id: "room_002", name: "Project Planning", createdAt: "2025-07-19" },
  ]);

  const [roomName, setRoomName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const [createModal, setCreateModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [shareModal, setShareModal] = useState({
    isOpen: false,
    roomId: "",
    roomName: "",
  });

  // Create a new room
  const createRoom = () => {
    if (!roomName.trim()) {
      alert("Please enter a room name");
      return;
    }

    const newRoom = {
      id: "room_" + Date.now().toString(36),
      name: roomName.trim(),
      createdAt: new Date().toISOString().split("T")[0],
    };

    setRooms((prev) => [newRoom, ...prev]);
    setRoomName("");
    setCreateModal(false);
    alert("Room created successfully!");
  };

  // Join an existing room
  const joinRoom = () => {
    if (!joinRoomId.trim()) {
      alert("Please enter a room ID");
      return;
    }

    alert(`Joining room: ${joinRoomId}`);
    setJoinRoomId("");
    setJoinModal(false);
  };

  // Enter a room
  const enterRoom = (roomId) => {
    alert(`Entering room: ${roomId}`);
  };

  // Share a room
  const shareRoom = (roomId, roomName) => {
    setShareModal({ isOpen: true, roomId, roomName });
  };

  // Delete a room
  const deleteRoom = (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setRooms((prev) => prev.filter((room) => room.id !== roomId));
    }
  };

  // Copy share link
  const copyLink = () => {
    const shareUrl = `${window.location.origin}/room/${shareModal.roomId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  // Handle key press events
  const handleKeyPress = (e, action) => {
    if (e.key === "Enter") {
      action();
    }
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Hero Section */}
        <div className="flex flex-col items-center mt-32">
          <div className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            Your Creative Workspace
          </div>
          <div className="mt-3 text-slate-200 text-center px-3">
            Create, collaborate, and bring your ideas to life with our powerful
            whiteboard platform
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 mt-12">
          <button
            onClick={() => setCreateModal(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Create Room
          </button>
          <button
            onClick={() => setJoinModal(true)}
            className="bg-white/10 border border-white/20 text-white py-4 px-8 rounded-xl font-semibold hover:bg-white/20 hover:border-white/30 transform hover:scale-[1.02] transition-all duration-200"
          >
            Join Room
          </button>
        </div>

        {/* Rooms Section */}
        <div className="w-full max-w-6xl px-4 mt-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Your Rooms
          </h2>

          {rooms.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                📋
              </div>
              <h3 className="text-xl font-semibold mb-2">No rooms yet</h3>
              <p className="text-slate-400">
                Create your first room to get started with collaborative
                whiteboarding
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white/8 border border-white/10 rounded-xl p-6 backdrop-blur-md hover:bg-white/12 hover:border-blue-500/30 hover:transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {room.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono bg-white/10 px-2 py-1 rounded mt-1 inline-block">
                        {room.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => enterRoom(room.id)}
                      className="flex-1 bg-green-500/20 text-green-300 border border-green-500/30 py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-500/30 hover:border-green-500/50 transition-all"
                    >
                      Enter
                    </button>
                    <button
                      onClick={() => shareRoom(room.id, room.name)}
                      className="flex-1 bg-white/10 text-white border border-white/20 py-2 px-3 rounded-lg text-sm font-medium hover:bg-white/20 hover:border-white/30 transition-all"
                    >
                      Share
                    </button>
                    <button
                      onClick={() => deleteRoom(room.id)}
                      className="flex-1 bg-red-500/20 text-red-300 border border-red-500/30 py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-500/30 hover:border-red-500/50 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Room Modal */}
      {createModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setCreateModal(false)}
        >
          <div
            className="bg-slate-900/95 border border-white/10 rounded-2xl p-8 max-w-md w-full backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Create New Room</h3>
              <button
                onClick={() => setCreateModal(false)}
                className="text-slate-400 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  Room Name
                </label>
                <input
                  type="text"
                  placeholder="Enter room name..."
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, createRoom)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <button
                onClick={createRoom}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Create Room
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Room Modal */}
      {joinModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setJoinModal(false)}
        >
          <div
            className="bg-slate-900/95 border border-white/10 rounded-2xl p-8 max-w-md w-full backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Join Existing Room</h3>
              <button
                onClick={() => setJoinModal(false)}
                className="text-slate-400 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  Room ID
                </label>
                <input
                  type="text"
                  placeholder="Enter room ID..."
                  value={joinRoomId}
                  onChange={(e) => setJoinRoomId(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, joinRoom)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <button
                onClick={joinRoom}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Join Room
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareModal.isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() =>
            setShareModal({ isOpen: false, roomId: "", roomName: "" })
          }
        >
          <div
            className="bg-slate-900/95 border border-white/10 rounded-2xl p-8 max-w-md w-full backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Share Room</h3>
              <button
                onClick={() =>
                  setShareModal({ isOpen: false, roomId: "", roomName: "" })
                }
                className="text-slate-400 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-300 mb-4">
              Share this link with your team members:
            </p>

            <div className="bg-white/10 border border-white/20 rounded-lg p-3 flex items-center gap-3">
              <input
                type="text"
                value={`${window.location.origin}/room/${shareModal.roomId}`}
                readOnly
                className="flex-1 bg-transparent border-none text-white font-mono text-sm focus:outline-none"
              />
              <button
                onClick={copyLink}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
