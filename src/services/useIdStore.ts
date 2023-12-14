import {create} from 'zustand';

const useIdStore = create(set => ({
  userId: null,
  teamId: null,
  projectId: null,
  memberId: null,
  taskId: null,

  setUserId: (userId:string) => set({ userId }),
  setTeamId: (teamId:string) => set({ teamId }),
  setProjectId: (projectId:string) => set({ projectId }),
  setMemberId: (memberId:string) => set({ memberId }),
  setTaskId: (taskId:string) => set({ taskId }),

  clearIds: () => set({ userId: null, teamId: null, projectId: null, memberId: null, taskId: null })
}));

export default useIdStore;
