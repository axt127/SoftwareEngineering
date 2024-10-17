'use client'

import { useState, useRef, useEffect } from 'react'
import { Save, Plus, Trash2 } from 'lucide-react'

interface Item {
  itemNumber: string
  partNumber: string
  description: string
  quantity: number
  costPerUnit: number
}

export default function PurchaseOrder() {
  const [poInfo, setPOInfo] = useState({
    poNumber: '',
    client: '',
    destination: '',
    vendor: '',
    shipVia: '',
    date: '',
    notes: '',
  })

  const [items, setItems] = useState<Item[]>([
    { itemNumber: '1', partNumber: '', description: '', quantity: 0, costPerUnit: 0 }
  ])

  const lastRowRef = useRef<HTMLTableRowElement>(null)

  const handlePOInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPOInfo({ ...poInfo, [e.target.name]: e.target.value })
  }

  const handleItemChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [e.target.name]: e.target.value as string }
    setItems(newItems)
  }

  const addItem = () => {
    const newItemNumber = (items.length + 1).toString()
    setItems([...items, { itemNumber: newItemNumber, partNumber: '', description: '', quantity: 0, costPerUnit: 0 }])
  }

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Tab' && !e.shiftKey && index === items.length - 1 && e.currentTarget.name === 'costPerUnit') {
      e.preventDefault()
      addItem()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('PO Info:', poInfo)
    console.log('Items:', items)
    // Here you would typically send this data to your backend
  }

  useEffect(() => {
    if (lastRowRef.current) {
      const inputs = lastRowRef.current.querySelectorAll('input, textarea')
      inputs[0]?.focus()
    }
  }, [items.length])

  const totalCost = items.reduce((sum, item) => sum + Number(item.quantity) * Number(item.costPerUnit), 0)

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-4 space-y-6">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Purchase Order Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(poInfo).map(([key, value]) => (
            key !== 'notes' && (
              <div key={key} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={key}
                  type={key === 'date' ? 'date' : 'text'}
                  name={key}
                  value={value}
                  onChange={handlePOInfoChange}
                  required={key !== 'shipVia'}
                />
              </div>
            )
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
            Notes
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="notes"
            name="notes"
            value={poInfo.notes}
            onChange={handlePOInfoChange}
            rows={3}
          />
        </div>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Items</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Item #</th>
              <th className="text-left">Part Number</th>
              <th className="text-left">Description</th>
              <th className="text-left">Quantity</th>
              <th className="text-left">Cost per Unit</th>
              <th className="text-left">Total Cost</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} ref={index === items.length - 1 ? lastRowRef : null}>
                <td>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="itemNumber"
                    value={item.itemNumber}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="partNumber"
                    value={item.partNumber}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </td>
                <td>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y min-h-[2.5rem]"
                    name="description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, e)}
                    rows={1}
                  />
                </td>
                <td>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="quantity"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="costPerUnit"
                    type="number"
                    value={item.costPerUnit}
                    onChange={(e) => handleItemChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                </td>
                <td>${(Number(item.quantity) * Number(item.costPerUnit)).toFixed(2)}</td>
                <td>
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove item</span>
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} className="text-right font-bold">Total:</td>
              <td className="font-bold">${totalCost.toFixed(2)}</td>
              <td>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={addItem}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        <Save className="mr-2 h-4 w-4" /> Save Purchase Order
      </button>
    </form>
  )
}