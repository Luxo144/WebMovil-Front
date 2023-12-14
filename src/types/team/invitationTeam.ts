export interface CreateInvitationRequest {
    teamId: number;
    emailInvitedUser: number;
  }
  

  
  //response

export interface GetInvitationsResponse{
    id : number;
    invitedUserId: number;
    status: string;
    invitationDate: string;
    team: Team;
}

interface Team {
  code: string;
  createdAt: string;
  createdByUserId: number;
  deletedAt: string;
  description: string;
  id: number;
  name: string;
  updatedAt: string;
}
