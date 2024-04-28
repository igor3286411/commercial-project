import { createContext } from "react";

interface AppContextType {
    clickRedactContext: Array<{ id: string, isOpen: boolean }>;
    setClickRedactContext: (p1: Array<{ id: string, isOpen: boolean }>) => void;
}

export const SectionContext = createContext<AppContextType>({
    clickRedactContext: [],
    setClickRedactContext: (p1: Array<{ id: string, isOpen: boolean }>) => { }
})