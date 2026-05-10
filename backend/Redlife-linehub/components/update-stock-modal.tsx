'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Minus } from 'lucide-react'

interface UpdateStockModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdate: () => void
}

interface StockData {
  [key: string]: number
}

const BLOOD_GROUPS = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']

export function UpdateStockModal({ isOpen, onClose, onUpdate }: UpdateStockModalProps) {
  const [stock, setStock] = useState<StockData>({})

  useEffect(() => {
    if (isOpen) {
      const savedStock = JSON.parse(localStorage.getItem('bloodStockData') || '{}')
      const initialStock = BLOOD_GROUPS.reduce((acc, group) => ({
        ...acc,
        [group]: savedStock[group] || 0,
      }), {})
      setStock(initialStock)
    }
  }, [isOpen])

  const handleQuantityChange = (bloodGroup: string, value: number) => {
    if (value < 0) return
    setStock(prev => ({ ...prev, [bloodGroup]: value }))
  }

  const handleIncrement = (bloodGroup: string) => {
    setStock(prev => ({ ...prev, [bloodGroup]: prev[bloodGroup] + 1 }))
  }

  const handleDecrement = (bloodGroup: string) => {
    if (stock[bloodGroup] > 0) {
      setStock(prev => ({ ...prev, [bloodGroup]: prev[bloodGroup] - 1 }))
    }
  }

  const handleSave = () => {
    localStorage.setItem('bloodStockData', JSON.stringify(stock))
    onUpdate()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Blood Stock</DialogTitle>
          <DialogDescription>
            Manage inventory levels for all blood groups
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          {BLOOD_GROUPS.map(group => (
            <div key={group} className="space-y-2 p-4 border rounded-lg">
              <Label className="text-base font-semibold">{group}</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDecrement(group)}
                  className="w-10 h-10 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Input
                  type="number"
                  value={stock[group]}
                  onChange={(e) => handleQuantityChange(group, parseInt(e.target.value) || 0)}
                  className="text-center flex-1 text-lg font-bold"
                  min="0"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleIncrement(group)}
                  className="w-10 h-10 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {stock[group] < 5 ? '⚠️ Low Stock' : '✓ Adequate'}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-primary">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
