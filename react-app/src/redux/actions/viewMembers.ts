import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { ActionFlag } from "./index";

import { StoreState } from "../store/types";
import * as orgModel from "../../data/models/organization/model";
import * as uberModel from "../../data/models/uber";
import { AppError } from "@kbase/ui-components";
import { extractViewOrgModelPlus } from "../../lib/stateExtraction";
import { AuthenticationStatus } from "@kbase/ui-components/lib/redux/auth/store";

// LOADING

export interface Load extends Action {
  type: ActionFlag.VIEW_MEMBERS_LOAD;
  organizationId: string;
}

export interface LoadStart extends Action {
  type: ActionFlag.VIEW_MEMBERS_LOAD_START;
}

export interface Unload extends Action {
  type: ActionFlag.VIEW_MEMBERS_UNLOAD;
}

export interface LoadSuccess extends Action {
  type: ActionFlag.VIEW_MEMBERS_LOAD_SUCCESS;
  organization: orgModel.Organization;
  relation: orgModel.Relation;
}

export interface LoadError extends Action {
  type: ActionFlag.VIEW_MEMBERS_LOAD_ERROR;
  error: AppError;
}

export function loadStart(): LoadStart {
  return {
    type: ActionFlag.VIEW_MEMBERS_LOAD_START,
  };
}

export function loadSuccess(
  organization: orgModel.Organization,
  relation: orgModel.Relation,
): LoadSuccess {
  return {
    type: ActionFlag.VIEW_MEMBERS_LOAD_SUCCESS,
    organization: organization,
    relation: relation,
  };
}

export function loadError(error: AppError): LoadError {
  return {
    type: ActionFlag.VIEW_MEMBERS_LOAD_ERROR,
    error: error,
  };
}

export function unload(): Unload {
  return {
    type: ActionFlag.VIEW_MEMBERS_UNLOAD,
  };
}

export function load(organizationId: string) {
  return async (
    dispatch: ThunkDispatch<StoreState, void, Action>,
    getState: () => StoreState,
  ) => {
    dispatch(loadStart());

    const {
      authentication,
      app: { config },
    } = getState();

    if (authentication.status !== AuthenticationStatus.AUTHENTICATED) {
      throw new Error("Not authenticated.");
    }
    const { userAuthentication: { token, username } } = authentication;

    const uberClient = new uberModel.UberModel({
      token,
      username,
      groupsServiceURL: config.services.Groups.url,
      serviceWizardURL: config.services.ServiceWizard.url,
      userProfileServiceURL: config.services.UserProfile.url,
      workspaceServiceURL: config.services.Workspace.url,
    });

    try {
      const { organization, relation } = await uberClient
        .getOrganizationForUser(organizationId);
      if (organization.kind !== orgModel.OrganizationKind.NORMAL) {
        dispatch(
          loadError({
            code: "invalid state",
            message: 'Organization must be of kind "NORMAL"',
          }),
        );
        return;
      }
      dispatch(loadSuccess(organization, relation));
    } catch (ex: any) {
      dispatch(
        loadError({
          code: ex.name,
          message: ex.message,
        }),
      );
    }
  };
}

// Promoting member to admin

export interface PromoteToAdmin extends Action {
  type: ActionFlag.VIEW_MEMBERS_PROMOTE_TO_ADMIN;
  memberUsername: string;
}

export interface PromoteToAdminStart extends Action {
  type: ActionFlag.VIEW_MEMBERS_PROMOTE_TO_ADMIN_START;
}

export interface PromoteToAdminSuccess extends Action {
  type: ActionFlag.VIEW_MEMBERS_PROMOTE_TO_ADMIN_SUCCESS;
  memberUsername: string;
}

export interface PromoteToAdminError extends Action {
  type: ActionFlag.VIEW_MEMBERS_PROMOTE_TO_ADMIN_ERROR;
  error: AppError;
}

export function promoteToAdminStart(): PromoteToAdminStart {
  return {
    type: ActionFlag.VIEW_MEMBERS_PROMOTE_TO_ADMIN_START,
  };
}

export function promoteToAdminSuccess(
  memberUsername: string,
): PromoteToAdminSuccess {
  return {
    type: ActionFlag.VIEW_MEMBERS_PROMOTE_TO_ADMIN_SUCCESS,
    memberUsername,
  };
}

export function promoteToAdminError(error: AppError): PromoteToAdminError {
  return {
    type: ActionFlag.VIEW_MEMBERS_PROMOTE_TO_ADMIN_ERROR,
    error: error,
  };
}

export function promoteToAdmin(memberUsername: string) {
  return (
    dispatch: ThunkDispatch<StoreState, void, Action>,
    getState: () => StoreState,
  ) => {
    dispatch(promoteToAdminStart());

    const { viewModel, username, token, config } = extractViewOrgModelPlus(
      getState(),
    );

    const orgClient = new orgModel.OrganizationModel({
      token,
      username,
      groupsServiceURL: config.services.Groups.url,
      userProfileServiceURL: config.services.UserProfile.url,
    });

    orgClient
      .memberToAdmin(viewModel.organization.id, memberUsername)
      .then((org) => {
        dispatch(promoteToAdminSuccess(memberUsername));
      })
      .catch((err: Error) => {
        dispatch(
          promoteToAdminError({
            code: err.name,
            message: err.message,
          }),
        );
      });
  };
}

// Demote admin to member

export interface DemoteToMember extends Action {
  type: ActionFlag.VIEW_MEMBERS_DEMOTE_TO_MEMBER;
  memberUsername: string;
}

export interface DemoteToMemberStart extends Action {
  type: ActionFlag.VIEW_MEMBERS_DEMOTE_TO_MEMBER_START;
}

export interface DemoteToMemberSuccess extends Action {
  type: ActionFlag.VIEW_MEMBERS_DEMOTE_TO_MEMBER_SUCCESS;
  memberUsername: string;
}

export interface DemoteToMemberError extends Action {
  type: ActionFlag.VIEW_MEMBERS_DEMOTE_TO_MEMBER_ERROR;
  error: AppError;
}

export function demoteToMemberStart(): DemoteToMemberStart {
  return {
    type: ActionFlag.VIEW_MEMBERS_DEMOTE_TO_MEMBER_START,
  };
}

export function demoteToMemberSuccess(
  memberUsername: string,
): DemoteToMemberSuccess {
  return {
    type: ActionFlag.VIEW_MEMBERS_DEMOTE_TO_MEMBER_SUCCESS,
    memberUsername: memberUsername,
  };
}

export function demoteToMemberError(error: AppError): DemoteToMemberError {
  return {
    type: ActionFlag.VIEW_MEMBERS_DEMOTE_TO_MEMBER_ERROR,
    error: error,
  };
}

export function demoteToMember(memberUsername: string) {
  return (
    dispatch: ThunkDispatch<StoreState, void, Action>,
    getState: () => StoreState,
  ) => {
    dispatch(demoteToMemberStart());

    const { viewModel, username, token, config } = extractViewOrgModelPlus(
      getState(),
    );

    const orgClient = new orgModel.OrganizationModel({
      token,
      username,
      groupsServiceURL: config.services.Groups.url,
      userProfileServiceURL: config.services.UserProfile.url,
    });

    orgClient
      .adminToMember(viewModel.organization.id, memberUsername)
      .then((org) => {
        dispatch(demoteToMemberSuccess(memberUsername));
        // dispatch(viewMembersLoad(view.organization.id))
      })
      .catch((err: Error) => {
        dispatch(
          demoteToMemberError({
            code: err.name,
            message: err.message,
          }),
        );
      });
  };
}

// Remove a member

export interface RemoveMember extends Action {
  type: ActionFlag.VIEW_MEMBERS_REMOVE_MEMBER;
  memberUsername: string;
}

interface RemoveMemberStart extends Action {
  type: ActionFlag.VIEW_MEMBERS_REMOVE_MEMBER_START;
}

interface RemoveMemberSuccess extends Action {
  type: ActionFlag.VIEW_MEMBERS_REMOVE_MEMBER_SUCCESS;
}

interface RemoveMemberError extends Action {
  type: ActionFlag.VIEW_MEMBERS_REMOVE_MEMBER_ERROR;
  error: AppError;
}

function removeMemberStart(): RemoveMemberStart {
  return {
    type: ActionFlag.VIEW_MEMBERS_REMOVE_MEMBER_START,
  };
}

function removeMemberSuccess(): RemoveMemberSuccess {
  return {
    type: ActionFlag.VIEW_MEMBERS_REMOVE_MEMBER_SUCCESS,
  };
}

function removeMemberError(error: AppError): RemoveMemberError {
  return {
    type: ActionFlag.VIEW_MEMBERS_REMOVE_MEMBER_ERROR,
    error: error,
  };
}

export function removeMember(memberUsername: string) {
  return (
    dispatch: ThunkDispatch<StoreState, void, Action>,
    getState: () => StoreState,
  ) => {
    dispatch(removeMemberStart());

    const { viewModel, username, token, config } = extractViewOrgModelPlus(
      getState(),
    );

    const orgClient = new orgModel.OrganizationModel({
      token,
      username,
      groupsServiceURL: config.services.Groups.url,
      userProfileServiceURL: config.services.UserProfile.url,
    });

    orgClient
      .removeMember(viewModel.organization.id, memberUsername)
      .then(() => {
        dispatch(removeMemberSuccess());
        dispatch(load(viewModel.organization.id));
      })
      .catch((err: Error) => {
        dispatch(
          removeMemberError({
            code: err.name,
            message: err.message,
          }),
        );
      });
  };
}
