import { create } from 'zustand'

interface ArtInteractionState {
    hoveredId: number | null
    setHoveredId: (id: number | null) => void
    activeFilter: string | null
    setActiveFilter: (filter: string | null) => void
}

export const useArtInteraction = create<ArtInteractionState>((set) => ({
    hoveredId: null,
    setHoveredId: (id) => set({ hoveredId: id }),
    activeFilter: null,
    setActiveFilter: (filter) => set({ activeFilter: filter }),
}))
