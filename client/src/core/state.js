import { getContext, incrementStateIndex } from "./context.js"
import { Render } from "./render.js"

export function useState(initialValue) {
    const { currentComponent } = getContext()
    const index = incrementStateIndex()

    if (!currentComponent.states) {
        currentComponent.states = []
    }

    if (currentComponent.states[index] === undefined) {
        currentComponent.states[index] = initialValue
    }

    function setState(newValue) {
        currentComponent.states[index] = newValue
        Render(currentComponent.container, currentComponent.component)
    }

    return [currentComponent.states[index], setState]
}




const globalStore = new Map()

export const state = {
    set(key, value) {
        globalStore.set(key, value)
    },
    get(key) {
        return globalStore.get(key)
    },
    has(key) {
        return globalStore.has(key)
    },
    delete(key) {
        globalStore.delete(key)
    },
    clear() {
        globalStore.clear()
    }
}

