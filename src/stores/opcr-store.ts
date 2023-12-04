import { SuccessIndicator, Target } from '@/types/opcr.types';
import { ChangeEvent } from 'react';
import { v4 as uuid } from 'uuid';
import { create } from 'zustand';

interface OpcrStates {
  targets: Target[];
}

interface OpcrActions {
  setTargets: (targets: Target[]) => void;

  addTarget: () => void;
  deleteTarget: (targetId: string) => void;
  handleTarget: (e: ChangeEvent<HTMLInputElement>, targetId: string) => void;

  updateTargetDetails: (data: Target) => void;
}

export const initialSuccessIndicator: SuccessIndicator = {
  accomplishment: '',
  assigned_to: [''],
  budget: 0,
  division: '',
  indicator: '',
  rating: [0, 0, 0, 0],
  remarks: [''],
};

const initialTarget = (): Target => {
  return {
    _id: { $oid: uuid() },
    name: '',
    success: [initialSuccessIndicator],
  };
};

export const useOpcr = create<OpcrStates & OpcrActions>((set, get) => ({
  targets: [],

  setTargets: (targets) => {
    console.log('trigger', targets);

    set({ targets });
  },

  // Target
  addTarget: () => {
    const latestTargets = get().targets;
    set({ targets: [...latestTargets, initialTarget()] });
  },

  deleteTarget: (targetId) => {
    const targets = get().targets;
    const latestTargets = targets.filter(
      (target) => target._id.$oid !== targetId,
    );

    set({ targets: latestTargets });
  },

  handleTarget: (e, targetId) => {
    const value = e.target.value;

    const latestTargets = get().targets;
    const updatedTargets = latestTargets.map((target) => {
      return target._id.$oid === targetId ? { ...target, name: value } : target;
    });

    set({ targets: updatedTargets });
  },

  updateTargetDetails: (targetData) => {
    const targetId = targetData._id.$oid;
    const targets = get().targets;

    const updatedTargets = targets.map((target) =>
      target._id.$oid === targetId ? targetData : target,
    );
    set({ targets: updatedTargets });
  },
}));
