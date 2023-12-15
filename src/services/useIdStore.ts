import {create} from 'zustand';

const useIdStore = create<IdState>(set => ({
  userId: null,
  teamId: null,
  projectId: null,
  memberId: null,
  taskId: null,
  codeTeam: null,

  setUserId: (userId) => set({ userId }),
  setTeamId: (teamId) => set({ teamId }),
  setProjectId: (projectId) => set({ projectId }),
  setMemberId: (memberId) => set({ memberId }),
  setTaskId: (taskId) => set({ taskId }),
  setCodeTeam: (codeTeam) => set({ codeTeam }),

  clearIds: () => set({ userId: null, teamId: null, projectId: null, memberId: null, taskId: null })
}));

export default useIdStore;

interface IdState {
  userId: number | null;
  teamId: number | null;
  projectId: number | null;
  memberId: number | null;
  taskId: number | null;
  codeTeam: string | null;

  setUserId: (userId: number) => void;
  setTeamId: (teamId: number) => void;
  setProjectId: (projectId: number) => void;
  setMemberId: (memberId: number) => void;
  setTaskId: (taskId: number) => void;
  setCodeTeam: (codeTeam: string) => void;

  clearIds: () => void;
}
