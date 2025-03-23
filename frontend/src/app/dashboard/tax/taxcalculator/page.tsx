"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Tax slabs for the old regime (FY 2023-24)
const oldRegimeTaxSlabs = [
  { limit: 250000, rate: 0 },
  { limit: 500000, rate: 0.05 },
  { limit: 1000000, rate: 0.2 },
  { limit: Number.POSITIVE_INFINITY, rate: 0.3 },
]

// Tax slabs for the new regime (FY 2023-24)
const newRegimeTaxSlabs = [
  { limit: 300000, rate: 0 },
  { limit: 600000, rate: 0.05 },
  { limit: 900000, rate: 0.1 },
  { limit: 1200000, rate: 0.15 },
  { limit: 1500000, rate: 0.2 },
  { limit: Number.POSITIVE_INFINITY, rate: 0.3 },
]

export default function Home() {
  // Tax Calculator State
  const [income, setIncome] = useState<number | "">("")
  const [regime, setRegime] = useState<"old" | "new">("new")
  const [deduction80C, setDeduction80C] = useState<number | "">("")
  const [deduction80D, setDeduction80D] = useState<number | "">("")
  const [otherDeductions, setOtherDeductions] = useState<number | "">("")
  const [taxResult, setTaxResult] = useState<any>(null)
  const [taxError, setTaxError] = useState<string | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  // Calculate Tax
  const calculateTax = () => {
    if (!income) {
      setTaxError("Please enter your income")
      return
    }

    setIsCalculating(true)
    setTaxError(null)

    try {
      // Convert inputs to numbers
      const incomeValue = Number(income)
      const deduction80CValue = Number(deduction80C || 0)
      const deduction80DValue = Number(deduction80D || 0)
      const otherDeductionsValue = Number(otherDeductions || 0)

      let taxableIncome = incomeValue
      let taxAmount = 0
      let effectiveRate = 0
      const slabBreakdown = []

      // Apply deductions only for old regime
      if (regime === "old") {
        // 80C deduction (max 1.5 lakh)
        const deduction80CFinal = Math.min(deduction80CValue, 150000)

        // 80D deduction (max 25k for self, 25k for parents, 50k for senior citizens)
        const deduction80DFinal = Math.min(deduction80DValue, 100000)

        // Calculate taxable income after deductions
        taxableIncome = Math.max(0, incomeValue - deduction80CFinal - deduction80DFinal - otherDeductionsValue)
      }

      // Select tax slabs based on regime
      const taxSlabs = regime === "old" ? oldRegimeTaxSlabs : newRegimeTaxSlabs

      // Calculate tax based on slabs
      let remainingIncome = taxableIncome
      let previousLimit = 0

      for (const slab of taxSlabs) {
        const slabIncome = Math.min(remainingIncome, slab.limit - previousLimit)
        const slabTax = slabIncome * slab.rate

        if (slabIncome > 0) {
          slabBreakdown.push({
            income: slabIncome,
            rate: slab.rate * 100,
            tax: slabTax,
          })
        }

        taxAmount += slabTax
        remainingIncome -= slabIncome
        previousLimit = slab.limit

        if (remainingIncome <= 0) break
      }

      // Calculate cess (4% of tax amount)
      const cess = taxAmount * 0.04

      // Calculate effective tax rate
      effectiveRate = incomeValue > 0 ? ((taxAmount + cess) / incomeValue) * 100 : 0

      // Set the result
      setTaxResult({
        income: incomeValue,
        taxableIncome,
        taxAmount,
        cess,
        totalTax: taxAmount + cess,
        effectiveRate,
        regime,
        slabBreakdown,
        deductions:
          regime === "old"
            ? {
                "80C": Math.min(deduction80CValue, 150000),
                "80D": Math.min(deduction80DValue, 100000),
                others: otherDeductionsValue,
              }
            : null,
      })
    } catch (error) {
      console.error("Tax calculation error:", error)
      setTaxError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsCalculating(false)
    }
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Indian Tax Calculator</h1>

      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Income Tax Calculator (FY 2023-24)</CardTitle>
            <CardDescription>Calculate your income tax based on Indian tax slabs and deductions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="income">Annual Income (₹)</Label>
              <Input
                id="income"
                type="number"
                placeholder="Enter your annual income"
                value={income}
                onChange={(e) => setIncome(e.target.value ? Number(e.target.value) : "")}
              />
            </div>

            <div className="space-y-2">
              <Label>Tax Regime</Label>
              <RadioGroup
                value={regime}
                onValueChange={(value) => setRegime(value as "old" | "new")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="new-regime" />
                  <Label htmlFor="new-regime">New Regime</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="old" id="old-regime" />
                  <Label htmlFor="old-regime">Old Regime (with deductions)</Label>
                </div>
              </RadioGroup>
            </div>

            {regime === "old" && (
              <div className="space-y-4 p-4 border rounded-md">
                <h3 className="font-medium">Deductions</h3>

                <div className="space-y-2">
                  <Label htmlFor="80c">Section 80C (₹)</Label>
                  <Input
                    id="80c"
                    type="number"
                    placeholder="Max 1,50,000"
                    value={deduction80C}
                    onChange={(e) => setDeduction80C(e.target.value ? Number(e.target.value) : "")}
                  />
                  <p className="text-xs text-muted-foreground">Includes PPF, ELSS, Life Insurance Premium, etc.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="80d">Section 80D - Health Insurance (₹)</Label>
                  <Input
                    id="80d"
                    type="number"
                    placeholder="Max 25,000 (50,000 for senior citizens)"
                    value={deduction80D}
                    onChange={(e) => setDeduction80D(e.target.value ? Number(e.target.value) : "")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="other">Other Deductions (₹)</Label>
                  <Input
                    id="other"
                    type="number"
                    placeholder="Other eligible deductions"
                    value={otherDeductions}
                    onChange={(e) => setOtherDeductions(e.target.value ? Number(e.target.value) : "")}
                  />
                </div>
              </div>
            )}

            {taxError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{taxError}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={calculateTax} disabled={isCalculating} className="w-full">
              {isCalculating ? "Calculating..." : "Calculate Tax"}
            </Button>
          </CardFooter>
        </Card>

        {taxResult && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Tax Calculation Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Gross Income</p>
                  <p className="text-2xl font-bold">₹{taxResult.income.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Taxable Income</p>
                  <p className="text-2xl font-bold">₹{taxResult.taxableIncome.toLocaleString("en-IN")}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Tax Breakdown</h3>
                <div className="space-y-2">
                  {taxResult.slabBreakdown.map((slab: any, index: number) => (
                    <div key={index} className="flex justify-between">
                      <span>Income @ {slab.rate}%</span>
                      <span>₹{slab.tax.toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <span>Health & Education Cess @ 4%</span>
                    <span>₹{taxResult.cess.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total Tax</span>
                  <span className="text-lg font-bold">₹{taxResult.totalTax.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Effective Tax Rate</span>
                  <span>{taxResult.effectiveRate.toFixed(2)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}

