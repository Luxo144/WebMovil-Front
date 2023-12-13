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
    nameTeam: string;
    codeTeam: string;
}

