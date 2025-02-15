"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Globe, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const userId = "1" // Replace with actual user ID
        const response = await fetch(`http://localhost:2000/collection/getCollectionsByUser/${userId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch collections")
        }
        const data = await response.json()
        const allCollections = [...data.publicCollections, ...data.privateCollections, ...data.collaboratorCollections]
        setCollections(allCollections)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  const filteredCollections = collections.filter((collection) =>
    collection.Name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddNew = () => {
    window.location.href = "/login"
  }

  const handleCardClick = (collectionId) => {
    window.location.href = `/collection/${collectionId}`
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading) return <div className="text-center mt-8">Loading...</div>
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2 rounded-lg">
          <Plus className="h-5 w-5" />
          Add New
        </Button>
      </div>
      <div className="grid gap-4">
        {filteredCollections.length > 0 ? (
          filteredCollections.map((collection) => (
            <div
              key={collection.CollectionID}
              onClick={() => handleCardClick(collection.CollectionID)}
              className="cursor-pointer"
            >
              <Card className="transition-all hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold">{collection.Name}</CardTitle>
                  {collection.IsPublic === 1 ? (
                    <Globe className="h-5 w-5 text-green-500" />
                  ) : (
                    <Lock className="h-5 w-5 text-gray-500" />
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{collection.Description}</p>
                  <p className="text-xs text-gray-400">Created on: {formatDate(collection.TimeCreated)}</p>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  )
}

