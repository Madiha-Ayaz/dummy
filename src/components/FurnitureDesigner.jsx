import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Palette, RotateCw, Move } from 'lucide-react';

export default function FurnitureDesigner() {
  const [step, setStep] = useState('select'); // select, design, final
  const [selectedImage, setSelectedImage] = useState(null);
  const [shelves, setShelves] = useState(4);
  const [width, setWidth] = useState(120);
  const [height, setHeight] = useState(200);
  const [orientation, setOrientation] = useState('vertical'); // vertical, horizontal, sloped
  const [slopeAngle, setSlopeAngle] = useState(0);
  const [color, setColor] = useState('#8B4513');
  const [accessories, setAccessories] = useState([]);
  const [selectedShelf, setSelectedShelf] = useState(0);

  const furnitureImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=400', name: 'Modern Shelf' },
    { id: 2, src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400', name: 'Classic Cupboard' },
    { id: 3, src: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400', name: 'Wall Unit' }
  ];

  const availableAccessories = [
    { id: 1, name: 'Vase', price: 800, icon: '🏺' },
    { id: 2, name: 'Books', price: 500, icon: '📚' },
    { id: 3, name: 'Plant', price: 600, icon: '🌿' },
    { id: 4, name: 'Clock', price: 1500, icon: '🕐' },
    { id: 5, name: 'Photo Frame', price: 400, icon: '🖼️' },
    { id: 6, name: 'Basket', price: 700, icon: '🧺' },
    { id: 7, name: 'Lamp', price: 2500, icon: '💡' },
    { id: 8, name: 'Box', price: 300, icon: '📦' }
  ];

  const colors = [
    { name: 'Walnut', hex: '#5C4033' },
    { name: 'Oak', hex: '#D2B48C' },
    { name: 'White', hex: '#F5F5F5' },
    { name: 'Black', hex: '#2C2C2C' },
    { name: 'Grey', hex: '#808080' },
    { name: 'Mahogany', hex: '#C04000' }
  ];

  const basePrice = 20000;
  const pricePerShelf = 1500;
  const pricePerCm = 80;

  const calculatePrice = () => {
    const furniturePrice = basePrice + 
      (shelves * pricePerShelf) + 
      ((width - 100) * pricePerCm) + 
      ((height - 180) * pricePerCm * 1.2) +
      (orientation === 'sloped' ? 3000 : 0) +
      (orientation === 'horizontal' ? 2000 : 0);
    const accessoriesPrice = accessories.reduce((sum, acc) => sum + acc.price, 0);
    return { 
      furniture: Math.round(furniturePrice), 
      accessories: accessoriesPrice, 
      total: Math.round(furniturePrice) + accessoriesPrice 
    };
  };

  const addAccessoryToShelf = (acc) => {
    setAccessories([...accessories, { ...acc, shelf: selectedShelf, id: Date.now() }]);
  };

  const removeAccessory = (id) => {
    setAccessories(accessories.filter(a => a.id !== id));
  };

  // Step 1: Image Selection
  if (step === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">Custom Furniture Designer</h1>
          <p className="text-center text-gray-600 mb-12">Select a furniture style to customize</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {furnitureImages.map(img => (
              <div 
                key={img.id}
                onClick={() => {
                  setSelectedImage(img);
                  setStep('design');
                }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={img.src} 
                    alt={img.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{img.name}</h3>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition">
                    Design This
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Final View
  if (step === 'final') {
    const prices = calculatePrice();
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Your Final Design</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Design Preview */}
            <div>
              <h3 className="text-xl font-bold mb-4">Design Preview</h3>
              <div className="flex justify-center">
                <div 
                  className="relative rounded-xl shadow-2xl border-4"
                  style={{ 
                    width: orientation === 'horizontal' ? '400px' : '300px',
                    height: orientation === 'horizontal' ? '250px' : '400px',
                    backgroundColor: color,
                    transform: orientation === 'sloped' ? `skewY(${slopeAngle}deg)` : 'none',
                    borderColor: '#333'
                  }}
                >
                  {/* Shelves */}
                  {[...Array(shelves)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-full border-t-4 border-gray-800"
                      style={{ 
                        top: `${((i + 1) * 100) / (shelves + 1)}%`,
                      }}
                    />
                  ))}
                  
                  {/* Accessories */}
                  {accessories.map((acc) => (
                    <div 
                      key={acc.id}
                      className="absolute text-3xl"
                      style={{
                        left: `${20 + (acc.id % 3) * 25}%`,
                        top: `${((acc.shelf) * 100) / (shelves + 1) + 8}%`,
                      }}
                    >
                      {acc.icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Details & Pricing */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-4">Specifications</h3>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-semibold">Base:</span> {selectedImage?.name}</p>
                  <p><span className="font-semibold">Width:</span> {width}cm</p>
                  <p><span className="font-semibold">Height:</span> {height}cm</p>
                  <p><span className="font-semibold">Shelves:</span> {shelves}</p>
                  <p><span className="font-semibold">Orientation:</span> {orientation}</p>
                  {orientation === 'sloped' && <p><span className="font-semibold">Slope:</span> {slopeAngle}°</p>}
                  <p><span className="font-semibold">Color:</span> {colors.find(c => c.hex === color)?.name}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-4">Price Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-lg">
                    <span>Furniture Structure</span>
                    <span className="font-bold">Rs. {prices.furniture}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Accessories ({accessories.length})</span>
                    <span className="font-bold">Rs. {prices.accessories}</span>
                  </div>
                  <div className="border-t-4 border-purple-300 pt-3 flex justify-between text-2xl font-bold text-purple-600">
                    <span>Total Price</span>
                    <span>Rs. {prices.total}</span>
                  </div>
                </div>
              </div>

              {accessories.length > 0 && (
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl">
                  <h3 className="font-bold text-xl mb-3">Accessories List</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {accessories.map((acc) => (
                      <div key={acc.id} className="flex items-center gap-2 bg-white p-2 rounded">
                        <span className="text-2xl">{acc.icon}</span>
                        <div className="text-sm">
                          <div className="font-semibold">{acc.name}</div>
                          <div className="text-gray-600">Rs. {acc.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => setStep('design')}
              className="bg-gray-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-600 transition"
            >
              Edit Design
            </button>
            <button 
              className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition flex items-center justify-center gap-2"
            >
              <ShoppingCart size={24} />
              Buy Furniture Only
              <div className="text-sm">(Rs. {prices.furniture})</div>
            </button>
            <button 
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition flex items-center justify-center gap-2"
            >
              <ShoppingCart size={24} />
              Buy Complete Set
              <div className="text-sm">(Rs. {prices.total})</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Design Customization
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Customize Your {selectedImage?.name}</h1>
          <button 
            onClick={() => setStep('select')}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            ← Back
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Designer - 2 columns */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6">Design Preview</h2>
            
            <div className="flex justify-center mb-6 p-8 bg-gray-50 rounded-xl">
              <div 
                className="relative rounded-xl shadow-2xl border-4 transition-all duration-500"
                style={{ 
                  width: orientation === 'horizontal' ? '400px' : '300px',
                  height: orientation === 'horizontal' ? '250px' : '400px',
                  backgroundColor: color,
                  transform: orientation === 'sloped' ? `skewY(${slopeAngle}deg)` : 'none',
                  borderColor: '#333'
                }}
              >
                {/* Shelves */}
                {[...Array(shelves)].map((_, i) => (
                  <div 
                    key={i}
                    onClick={() => setSelectedShelf(i)}
                    className={`absolute w-full border-t-4 cursor-pointer transition-all ${selectedShelf === i ? 'border-yellow-400 border-t-8' : 'border-gray-800'}`}
                    style={{ 
                      top: `${((i + 1) * 100) / (shelves + 1)}%`,
                    }}
                  />
                ))}
                
                {/* Accessories */}
                {accessories.map((acc) => (
                  <div 
                    key={acc.id}
                    onClick={() => removeAccessory(acc.id)}
                    className="absolute text-3xl cursor-pointer hover:scale-125 transition-transform"
                    style={{
                      left: `${20 + (acc.id % 3) * 25}%`,
                      top: `${((acc.shelf) * 100) / (shelves + 1) + 8}%`,
                    }}
                    title="Click to remove"
                  >
                    {acc.icon}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-700">
                💡 Click on shelves to select, then add accessories from the right panel
              </p>
              <p className="text-xs text-gray-600 mt-1">Selected Shelf: {selectedShelf + 1}</p>
            </div>
          </div>

          {/* Controls - 1 column */}
          <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
            <h2 className="text-2xl font-bold">Customize</h2>

            {/* Orientation */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block font-bold mb-3 flex items-center gap-2">
                <RotateCw size={20} /> Orientation
              </label>
              <div className="space-y-2">
                <button 
                  onClick={() => {setOrientation('vertical'); setSlopeAngle(0);}}
                  className={`w-full p-3 rounded-lg font-semibold transition ${orientation === 'vertical' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  Vertical (Standard)
                </button>
                <button 
                  onClick={() => {setOrientation('horizontal'); setSlopeAngle(0);}}
                  className={`w-full p-3 rounded-lg font-semibold transition ${orientation === 'horizontal' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  Horizontal (Wide)
                </button>
                <button 
                  onClick={() => setOrientation('sloped')}
                  className={`w-full p-3 rounded-lg font-semibold transition ${orientation === 'sloped' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  Sloped (Under Stairs)
                </button>
              </div>
              
              {orientation === 'sloped' && (
                <div className="mt-4">
                  <label className="text-sm font-semibold">Slope Angle: {slopeAngle}°</label>
                  <input 
                    type="range" 
                    min="-15" 
                    max="15" 
                    value={slopeAngle}
                    onChange={(e) => setSlopeAngle(Number(e.target.value))}
                    className="w-full mt-2"
                  />
                </div>
              )}
            </div>

            {/* Shelves */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block font-bold mb-3">Shelves: {shelves}</label>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShelves(Math.max(2, shelves - 1))}
                  className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600"
                >
                  <Minus size={20} />
                </button>
                <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full transition-all"
                    style={{ width: `${(shelves / 8) * 100}%` }}
                  />
                </div>
                <button 
                  onClick={() => setShelves(Math.min(8, shelves + 1))}
                  className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Dimensions */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block font-bold mb-2">Width: {width}cm</label>
              <input 
                type="range" 
                min="80" 
                max="250" 
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block font-bold mb-2">Height: {height}cm</label>
              <input 
                type="range" 
                min="120" 
                max="280" 
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Colors */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block font-bold mb-3 flex items-center gap-2">
                <Palette size={20} /> Color Theme
              </label>
              <div className="grid grid-cols-3 gap-3">
                {colors.map(c => (
                  <button
                    key={c.hex}
                    onClick={() => setColor(c.hex)}
                    className={`h-16 rounded-lg border-4 transition-all ${color === c.hex ? 'border-blue-500 scale-110' : 'border-gray-300'}`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Price Display */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Current Price</h3>
              <div className="text-3xl font-bold text-green-600">
                Rs. {calculatePrice().total}
              </div>
              <div className="text-sm text-gray-700 mt-2 space-y-1">
                <div>Furniture: Rs. {calculatePrice().furniture}</div>
                <div>Accessories: Rs. {calculatePrice().accessories}</div>
              </div>
            </div>
          </div>

          {/* Accessories Panel - 1 column */}
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Add Accessories</h2>
            <p className="text-sm text-gray-600 mb-4">Click to add to shelf {selectedShelf + 1}</p>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {availableAccessories.map(acc => (
                <button
                  key={acc.id}
                  onClick={() => addAccessoryToShelf(acc)}
                  className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg hover:from-purple-100 hover:to-purple-200 transition shadow hover:shadow-lg"
                >
                  <div className="text-4xl mb-2">{acc.icon}</div>
                  <div className="font-bold text-sm">{acc.name}</div>
                  <div className="text-xs text-gray-600">Rs. {acc.price}</div>
                </button>
              ))}
            </div>

            <button 
              onClick={() => setStep('final')}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-blue-600 transition shadow-lg hover:shadow-xl"
            >
              View Final Design →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}