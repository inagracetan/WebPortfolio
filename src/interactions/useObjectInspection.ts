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
  nearestInteractiveId: string | null
}

let state: ObjectInspectionState = {
  inspectedObject: null,
  activeInspectionModal: null,
  activeProjectDetail: null,
  activeSkillGroupDetail: null,
  nearestInteractiveId: null,
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
      skillGroup =
        skillGroupsData.find((s) => s.id === item.skillGroupId) ||
        skillGroupsData.find((s) => {
          if (item.skillGroupId === 'programming-development') return s.id === 'programming-languages'
          if (item.skillGroupId === 'database-backend') return s.id === 'database-systems'
          if (item.skillGroupId === 'networking-it') return s.id === 'networking'
          if (item.skillGroupId === 'cloud-security') return s.id === 'cloud-cybersecurity'
          if (item.skillGroupId === 'productivity-creative') return s.id === 'software-tools' || s.id === 'technical-support'
          return false
        }) ||
        null
    }

    // Defensive fallback: If modalType is SKILL_DETAIL and no skillGroup found, default to first skillGroup
    if (item.modalType === 'SKILL_DETAIL' && !skillGroup && skillGroupsData.length > 0) {
      skillGroup = skillGroupsData[0]
    }

    // Defensive fallback: If modalType is CUSTOM and no targetModal, open ABOUT
    if (item.modalType === 'CUSTOM' && !item.targetModal) {
      gameStore.openModal('ABOUT')
      return
    }

    state = {
      ...state,
      inspectedObject: item,
      activeInspectionModal: item.modalType,
      activeProjectDetail: project,
      activeSkillGroupDetail: skillGroup,
    }
    gameStore.setUiModalOpen(true)
    notify()
  },
  closeInspection: () => {
    if (state.activeInspectionModal) {
      soundEngine.playModalClose()
    }
    state = {
      ...state,
      inspectedObject: null,
      activeInspectionModal: null,
      activeProjectDetail: null,
      activeSkillGroupDetail: null,
    }
    gameStore.setUiModalOpen(gameStore.getState().activeModal !== null || gameStore.getState().isMenuOpen)
    notify()
  },
  setNearestInteractiveId: (id: string | null) => {
    if (state.nearestInteractiveId !== id) {
      state = { ...state, nearestInteractiveId: id }
      notify()
    }
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
    setNearestInteractiveId: objectInspectionStore.setNearestInteractiveId,
  }
}

