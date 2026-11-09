import { useState, useEffect } from 'react'
import type { InteractiveObjectItem, InspectionModalType } from './types'
import { projectsData } from '@/data/projects'
import { skillGroupsData } from '@/data/skills'
import type { Project, SkillGroup } from '@/data/types'
import { gameStore } from '@/hooks/useGameStore'
import { soundEngine } from '@/utilities/audio'

interface ObjectInspectionState {
  inspectedObject: InteractiveObjectItem | null
  activeInspectionModal: InspectionModalType | null
  activeProjectDetail: Project | null
  activeSkillGroupDetail: SkillGroup | null
}

let state: ObjectInspectionState = {
  inspectedObject: null,
  activeInspectionModal: null,
  activeProjectDetail: null,
  activeSkillGroupDetail: null,
}

type Listener = (state: ObjectInspectionState) => void
const listeners = new Set<Listener>()

function notify() {
  listeners.forEach((l) => l({ ...state }))
}

export const objectInspectionStore = {
  getState: () => state,
  openInspection: (item: InteractiveObjectItem) => {
    soundEngine.playInspect()

    // Handle standard game modals if specified
    if (item.targetModal) {
      gameStore.openModal(item.targetModal, item.projectId)
      return
    }

    let project: Project | null = null
    if (item.projectId) {
      project = projectsData.find((p) => p.id === item.projectId) || null
    }

    let skillGroup: SkillGroup | null = null
    if (item.skillGroupId) {
      skillGroup = skillGroupsData.find((s) => s.id === item.skillGroupId) || null
    }

    state = {
      inspectedObject: item,
      activeInspectionModal: item.modalType,
      activeProjectDetail: project,
      activeSkillGroupDetail: skillGroup,
    }
    notify()
  },
  closeInspection: () => {
    if (state.activeInspectionModal) {
      soundEngine.playModalClose()
    }
    state = {
      inspectedObject: null,
      activeInspectionModal: null,
      activeProjectDetail: null,
      activeSkillGroupDetail: null,
    }
    notify()
  },
}

export function useObjectInspection() {
  const [currentState, setCurrentState] = useState<ObjectInspectionState>(state)

  useEffect(() => {
    const listener: Listener = (newState) => {
      setCurrentState(newState)
    }
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }, [])

  return {
    ...currentState,
    openInspection: objectInspectionStore.openInspection,
    closeInspection: objectInspectionStore.closeInspection,
  }
}

