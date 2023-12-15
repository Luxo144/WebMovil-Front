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
  userId: string | null;
  teamId: number | null;
  projectId: number | null;
  memberId: string | null;
  taskId: string | null;
  codeTeam: string | null;

  setUserId: (userId: string) => void;
  setTeamId: (teamId: number) => void;
  setProjectId: (projectId: number) => void;
  setMemberId: (memberId: string) => void;
  setTaskId: (taskId: string) => void;
  setCodeTeam: (codeTeam: string) => void;

  clearIds: () => void;
}
