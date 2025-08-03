"use client";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { PencilRuler, Plus, Users, Share, Trash2, X } from "lucide-react";

interface IRoom {
  id: string;
  name: string;
}

export default function Home() {
  const router = useRouter();
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [joinId, setJoinId] = useState("");

  const createRoom = () => {
    if (!roomName.trim()) return;
    const newRoom = {
      id: "room_" + Date.now().toString(36),
      name: roomName.trim(),
    };
    setRooms((prev) => [newRoom, ...prev]);
    setRoomName("");
    setShowCreate(false);
  };

  const deleteRoom = (id: string) => {
    if (confirm("Delete this room?")) {
      setRooms((prev) => prev.filter((room) => room.id !== id));
    }
  };

  const shareRoom = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/room/${id}`);
    alert("Link copied!");
  };

  const Modal = ({
    show,
    onClose,
    title,
    children,
  }: {
    show: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
  }) =>
    show ? (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-xl p-6 w-96 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          {children}
        </div>
      </div>
    ) : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white border border-gray-200 rounded-2xl px-6 py-3 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-xl">
              <PencilRuler className="h-5 w-5 text-gray-700" />
            </div>
            <span className="text-lg font-semibold text-gray-800">
              DrawSync
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-28 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
              Your whiteboards
            </h1>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowCreate(true)}
                className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="h-5 w-5" />
                New
              </button>
              <button
                onClick={() => setShowJoin(true)}
                className="flex items-center gap-2 text-black bg-white border border-gray-200 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Users className="h-5 w-5 text-gray-600" />
                Join
              </button>
            </div>
          </div>

          {/* Rooms Grid */}
          {rooms.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PencilRuler className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                No whiteboards yet
              </h3>
              <p className="text-gray-500">
                Create your first whiteboard to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-gray-300"
                >
                  <div
                    onClick={() => router.push(`/canvas/${room.id}`)}
                    className="cursor-pointer"
                  >
                    <div className="bg-gray-50 h-48 flex items-center justify-center border-b border-gray-100">
                      <div className="p-4 bg-white rounded-2xl shadow-sm">
                        <PencilRuler className="h-12 w-12 text-gray-400" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 truncate text-lg">
                        {room.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 font-mono">
                        {room.id}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex gap-2">
                      <button
                        onClick={() => shareRoom(room.id)}
                        className="flex-1 flex items-center justify-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Share"
                      >
                        <Share className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Share</span>
                      </button>
                      <button
                        onClick={() => deleteRoom(room.id)}
                        className="flex-1 flex items-center justify-center gap-2 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-red-500">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Create Modal */}
          <Modal
            show={showCreate}
            onClose={() => setShowCreate(false)}
            title="Create new whiteboard"
          >
            <input
              type="text"
              placeholder="Enter whiteboard name..."
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && createRoom()}
              className="w-full p-4 border border-gray-200 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreate(false)}
                className="flex-1 text-black border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={createRoom}
                className="flex-1 bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors font-medium"
              >
                Create
              </button>
            </div>
          </Modal>

          {/* Join Modal */}
          <Modal
            show={showJoin}
            onClose={() => setShowJoin(false)}
            title="Join whiteboard"
          >
            <input
              type="text"
              placeholder="Enter room ID..."
              value={joinId}
              onChange={(e) => setJoinId(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && router.push(`/canvas/${joinId}`)
              }
              className="w-full p-4 border border-gray-200 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowJoin(false)}
                className="flex-1 text-black border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => router.push(`/canvas/${joinId}`)}
                className="flex-1 bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors font-medium"
              >
                Join
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
