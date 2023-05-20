import { create } from "zustand";

interface ActiveListUserStore{
    members: string[]
    add: (id: string) => void
    set: (ids: string[]) => void
    remove: (id: string) => void
}

const useActiveUser = create<ActiveListUserStore> ((set) =>({
    members: [],
    add: (id) => set((state) => ({members: [...state.members, id]})),
    remove: (id) => set((state) => ({members: 
        state.members.filter((memberID) => memberID !== id)
    })),
    set: (ids) => set({ members: ids})
}))

export default useActiveUser