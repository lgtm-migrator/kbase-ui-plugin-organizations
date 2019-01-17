export enum ActionFlag {
    APP = 1,
    APP_START,
    APP_SUCCESS,
    // APP_SUCCESS_IFRAME,
    // APP_SUCCESS_SOLO,
    APP_ERROR,

    BROWSE_ORGS_LOAD,
    BROWSE_ORGS_LOAD_START,
    BROWSE_ORGS_LOAD_SUCCESS,
    BROWSE_ORGS_LOAD_ERROR,
    BROWSE_ORGS_UNLOAD,

    BROWSE_ORGS_SORT,
    BROWSE_ORGS_SORT_START,
    BROWSE_ORGS_SORT_SUCCESS,
    BROWSE_ORGS_SORT_ERROR,

    BROWSE_ORGS_FILTER,
    BROWSE_ORGS_FILTER_START,
    BROWSE_ORGS_FILTER_SUCCESS,
    BROWSE_ORGS_FILTER_ERROR,

    BROWSE_ORGS_SEARCH,
    BROWSE_ORGS_SEARCH_START,
    BROWSE_ORGS_SEARCH_SUCCESS,
    BROWSE_ORGS_SEARCH_ERROR,

    UPDATE_ORG,
    UPDATE_ORG_START,
    UPDATE_ORG_SUCCESS,
    UPDATE_ORG_ERROR,

    // viewing org
    VIEW_ORG_LOAD,
    VIEW_ORG_LOAD_START,
    VIEW_ORG_LOAD_SUCCESS,
    VIEW_ORG_LOAD_ERROR,
    VIEW_ORG_UNLOAD,

    // Joining and Such
    VIEW_ORG_JOIN_REQUEST,
    VIEW_ORG_JOIN_REQUEST_START,
    VIEW_ORG_JOIN_REQUEST_SUCCESS,
    VIEW_ORG_JOIN_REQUEST_ERROR,

    VIEW_ORG_CANCEL_JOIN_REQUEST,
    VIEW_ORG_CANCEL_JOIN_REQUEST_START,
    VIEW_ORG_CANCEL_JOIN_REQUEST_SUCCESS,
    VIEW_ORG_CANCEL_JOIN_REQUEST_ERROR,

    VIEW_ORG_ACCEPT_JOIN_INVITATION,
    VIEW_ORG_ACCEPT_JOIN_INVITATION_START,
    VIEW_ORG_ACCEPT_JOIN_INVITATION_SUCCESS,
    VIEW_ORG_ACCEPT_JOIN_INVITATION_ERROR,

    VIEW_ORG_ACCEPT_INBOX_REQUEST,
    VIEW_ORG_ACCEPT_INBOX_REQUEST_START,
    VIEW_ORG_ACCEPT_INBOX_REQUEST_SUCCESS,
    VIEW_ORG_ACCEPT_INBOX_REQUEST_ERROR,

    VIEW_ORG_REJECT_INBOX_REQUEST,
    VIEW_ORG_REJECT_INBOX_REQUEST_START,
    VIEW_ORG_REJECT_INBOX_REQUEST_SUCCESS,
    VIEW_ORG_REJECT_INBOX_REQUEST_ERROR,

    VIEW_ORG_REJECT_JOIN_INVITATION,
    VIEW_ORG_REJECT_JOIN_INVITATION_START,
    VIEW_ORG_REJECT_JOIN_INVITATION_SUCCESS,
    VIEW_ORG_REJECT_JOIN_INVITATION_ERROR,

    VIEW_ORG_REMOVE_NARRATIVE,
    VIEW_ORG_REMOVE_NARRATIVE_START,
    VIEW_ORG_REMOVE_NARRATIVE_SUCCESS,
    VIEW_ORG_REMOVE_NARRATIVE_ERROR,

    VIEW_ORG_ACCESS_NARRATIVE,
    VIEW_ORG_ACCESS_NARRATIVE_START,
    VIEW_ORG_ACCESS_NARRATIVE_SUCCESS,
    VIEW_ORG_ACCESS_NARRATIVE_ERROR,

    // add org fields

    ADD_ORG_LOAD,
    ADD_ORG_LOAD_START,
    ADD_ORG_LOAD_SUCCESS,
    ADD_ORG_LOAD_ERROR,
    ADD_ORG_UNLOAD,

    ADD_ORG_UPDATE_NAME,
    ADD_ORG_UPDATE_NAME_SUCCESS,
    ADD_ORG_UPDATE_NAME_ERROR,

    ADD_ORG_UPDATE_LOGO_URL,
    ADD_ORG_UPDATE_LOGO_URL_SUCCESS,
    ADD_ORG_UPDATE_LOGO_URL_ERROR,

    ADD_ORG_UPDATE_ID,
    ADD_ORG_UPDATE_ID_SUCCESS,
    ADD_ORG_UPDATE_ID_ERROR,
    ADD_ORG_UPDATE_ID_PASS,
    ADD_ORG_EVALUATE_ID,

    ADD_ORG_UPDATE_DESCRIPTION,
    ADD_ORG_UPDATE_DESCRIPTION_SUCCESS,
    ADD_ORG_UPDATE_DESCRIPTION_ERROR,

    ADD_ORG_UPDATE_IS_PRIVATE,
    ADD_ORG_UPDATE_IS_PRIVATE_SUCCESS,
    ADD_ORG_UPDATE_IS_PRIVATE_ERROR,

    ADD_ORG_UPDATE_HOME_URL,
    ADD_ORG_UPDATE_HOME_URL_SUCCESS,
    ADD_ORG_UPDATE_HOME_URL_ERROR,

    ADD_ORG_UPDATE_RESEARCH_INTERESTS,
    ADD_ORG_UPDATE_RESEARCH_INTERESTS_SUCCESS,
    ADD_ORG_UPDATE_RESEARCH_INTERESTS_ERROR,

    ADD_ORG_EVALUATE,
    ADD_ORG_EVALUATE_OK,
    ADD_ORG_EVALUATE_ERRORS,

    ADD_ORG_SAVE,
    ADD_ORG_SAVE_START,
    ADD_ORG_SAVE_SUCCESS,
    ADD_ORG_SAVE_ERROR,


    // editing org
    EDIT_ORG_LOAD,
    EDIT_ORG_LOAD_START,
    EDIT_ORG_LOAD_SUCCESS,
    EDIT_ORG_LOAD_ERROR,
    EDIT_ORG_UNLOAD,

    EDIT_ORG_SAVE,
    EDIT_ORG_SAVE_START,
    EDIT_ORG_SAVE_SUCCESS,
    EDIT_ORG_SAVE_ERROR,

    // edit org, field level updates
    EDIT_ORG_UPDATE_NAME,
    EDIT_ORG_UPDATE_NAME_SUCCESS,
    EDIT_ORG_UPDATE_NAME_ERROR,

    EDIT_ORG_UPDATE_LOGO_URL,
    EDIT_ORG_UPDATE_LOGO_URL_SUCCESS,
    EDIT_ORG_UPDATE_LOGO_URL_ERROR,

    EDIT_ORG_UPDATE_DESCRIPTION,
    EDIT_ORG_UPDATE_DESCRIPTION_SUCCESS,
    EDIT_ORG_UPDATE_DESCRIPTION_ERROR,

    EDIT_ORG_UPDATE_IS_PRIVATE,
    EDIT_ORG_UPDATE_IS_PRIVATE_SUCCESS,
    EDIT_ORG_UPDATE_IS_PRIVATE_ERROR,

    EDIT_ORG_UPDATE_HOME_URL,
    EDIT_ORG_UPDATE_HOME_URL_SUCCESS,
    EDIT_ORG_UPDATE_HOME_URL_ERROR,

    EDIT_ORG_UPDATE_RESEARCH_INTERESTS,
    EDIT_ORG_UPDATE_RESEARCH_INTERESTS_SUCCESS,
    EDIT_ORG_UPDATE_RESEARCH_INTERESTS_ERROR,

    EDIT_ORG_EVALUATE,
    EDIT_ORG_EVALUATE_OK,
    EDIT_ORG_EVALUATE_ERRORS,

    // Auth
    AUTH_CHECK,
    AUTH_CHECK_START,
    AUTH_CHECK_ERROR,
    AUTH_AUTHORIZED,
    AUTH_UNAUTHORIZED,
    AUTH_REMOVE_AUTHORIZATION,
    AUTH_ADD_AUTHORIZATION,
    AUTH_ADD_AUTHORIZATION_ERROR,

    ADMIN_MANAGE_REQUESTS_LOAD,
    ADMIN_MANAGE_REQUESTS_LOAD_START,
    ADMIN_MANAGE_REQUESTS_LOAD_SUCCESS,
    ADMIN_MANAGE_REQUESTS_LOAD_ERROR,
    ADMIN_MANAGE_REQUESTS_UNLOAD,

    ADMIN_MANAGE_REQUESTS_ACCEPT_JOIN_REQUEST,
    ADMIN_MANAGE_REQUESTS_ACCEPT_JOIN_REQUEST_START,
    ADMIN_MANAGE_REQUESTS_ACCEPT_JOIN_REQUEST_SUCCESS,
    ADMIN_MANAGE_REQUESTS_ACCEPT_JOIN_REQUEST_ERROR,

    ADMIN_MANAGE_REQUESTS_DENY_JOIN_REQUEST,
    ADMIN_MANAGE_REQUESTS_DENY_JOIN_REQUEST_START,
    ADMIN_MANAGE_REQUESTS_DENY_JOIN_REQUEST_SUCCESS,
    ADMIN_MANAGE_REQUESTS_DENY_JOIN_REQUEST_ERROR,

    ADMIN_MANAGE_REQUESTS_CANCEL_JOIN_INVITATION,
    ADMIN_MANAGE_REQUESTS_CANCEL_JOIN_INVITATION_START,
    ADMIN_MANAGE_REQUESTS_CANCEL_JOIN_INVITATION_SUCCESS,
    ADMIN_MANAGE_REQUESTS_CANCEL_JOIN_INVITATION_ERROR,

    ADMIN_MANAGE_REQUESTS_GET_VIEW_ACCESS,
    ADMIN_MANAGE_REQUESTS_GET_VIEW_ACCESS_START,
    ADMIN_MANAGE_REQUESTS_GET_VIEW_ACCESS_SUCCESS,
    ADMIN_MANAGE_REQUESTS_GET_VIEW_ACCESS_ERROR,

    // MEMBERS
    VIEW_MEMBERS_LOAD,
    VIEW_MEMBERS_LOAD_START,
    VIEW_MEMBERS_LOAD_SUCCESS,
    VIEW_MEMBERS_LOAD_ERROR,
    VIEW_MEMBERS_UNLOAD,

    VIEW_MEMBERS_REMOVE_MEMBER,
    VIEW_MEMBERS_REMOVE_MEMBER_START,
    VIEW_MEMBERS_REMOVE_MEMBER_SUCCESS,
    VIEW_MEMBERS_REMOVE_MEMBER_ERROR,

    VIEW_MEMBERS_PROMOTE_TO_ADMIN,
    VIEW_MEMBERS_PROMOTE_TO_ADMIN_START,
    VIEW_MEMBERS_PROMOTE_TO_ADMIN_SUCCESS,
    VIEW_MEMBERS_PROMOTE_TO_ADMIN_ERROR,

    VIEW_MEMBERS_DEMOTE_TO_MEMBER,
    VIEW_MEMBERS_DEMOTE_TO_MEMBER_START,
    VIEW_MEMBERS_DEMOTE_TO_MEMBER_SUCCESS,
    VIEW_MEMBERS_DEMOTE_TO_MEMBER_ERROR,

    // INVITE USER
    INVITE_USER_LOAD,
    INVITE_USER_LOAD_START,
    INVITE_USER_LOAD_SUCCESS,
    INVITE_USER_LOAD_ERROR,
    INVITE_USER_UNLOAD,

    INVITE_USER_SEARCH_USERS,
    INVITE_USER_SEARCH_USERS_START,
    INVITE_USER_SEARCH_USERS_SUCCESS,
    INVITE_USER_SEARCH_USERS_ERROR,

    INVITE_USER_SELECT_USER,
    INVITE_USER_SELECT_USER_START,
    INVITE_USER_SELECT_USER_SUCCESS,
    INVITE_USER_SELECT_USER_ERROR,

    INVITE_USER_SEND_INVITATION,
    INVITE_USER_SEND_INVITATION_START,
    INVITE_USER_SEND_INVITATION_SUCCESS,
    INVITE_USER_SEND_INVITATION_ERROR,

    // Manage Membership
    MANAGE_MEMBERSHIP_LOAD,
    MANAGE_MEMBERSHIP_LOAD_START,
    MANAGE_MEMBERSHIP_LOAD_SUCCESS,
    MANAGE_MEMBERSHIP_LOAD_ERROR,
    MANAGE_MEMBERSHIP_UNLOAD,

    // Narrative add requests
    REQUEST_ADD_NARRATIVE_LOAD,
    REQUEST_ADD_NARRATIVE_LOAD_START,
    REQUEST_ADD_NARRATIVE_LOAD_SUCCESS,
    REQUEST_ADD_NARRATIVE_LOAD_ERROR,
    REQUEST_ADD_NARRATIVE_UNLOAD,

    REQUEST_ADD_NARRATIVE_SEND,
    REQUEST_ADD_NARRATIVE_SEND_START,
    REQUEST_ADD_NARRATIVE_SEND_SUCCESS,
    REQUEST_ADD_NARRATIVE_SEND_ERROR,

    REQUEST_ADD_NARRATIVE_SELECT_NARRATIVE,
    REQUEST_ADD_NARRATIVE_SELECT_NARRATIVE_START,
    REQUEST_ADD_NARRATIVE_SELECT_NARRATIVE_SUCCESS,
    REQUEST_ADD_NARRATIVE_SELECT_NARRATIVE_ERROR,

    DASHBOARD_LOAD,
    DASHBOARD_LOAD_START,
    DASHBOARD_LOAD_SUCCESS,
    DASHBOARD_LOAD_ERROR,
    DASHBOARD_UNLOAD,

    DASHBOARD_REFRESH,
    DASHBOARD_REFRESH_START,
    DASHBOARD_REFRESH_SUCCESS,
    DASHBOARD_REFRESH_ERROR,

    DASHBOARD_CANCEL_OUTBOX_REQUEST,
    DASHBOARD_CANCEL_OUTBOX_REQUEST_START,
    DASHBOARD_CANCEL_OUTBOX_REQUEST_SUCCESS,
    DASHBOARD_CANCEL_OUTBOX_REQUEST_ERROR,

    DASHBOARD_ACCEPT_INBOX_REQUEST,
    DASHBOARD_ACCEPT_INBOX_REQUEST_START,
    DASHBOARD_ACCEPT_INBOX_REQUEST_SUCCESS,
    DASHBOARD_ACCEPT_INBOX_REQUEST_ERROR,

    DASHBOARD_REJECT_INBOX_REQUEST,
    DASHBOARD_REJECT_INBOX_REQUEST_START,
    DASHBOARD_REJECT_INBOX_REQUEST_SUCCESS,
    DASHBOARD_REJECT_INBOX_REQUEST_ERROR,


    DASHBOARD_ACCEPT_ORG_INBOX_REQUEST,
    DASHBOARD_ACCEPT_ORG_INBOX_REQUEST_START,
    DASHBOARD_ACCEPT_ORG_INBOX_REQUEST_SUCCESS,
    DASHBOARD_ACCEPT_ORG_INBOX_REQUEST_ERROR,

    DASHBOARD_REJECT_ORG_INBOX_REQUEST,
    DASHBOARD_REJECT_ORG_INBOX_REQUEST_START,
    DASHBOARD_REJECT_ORG_INBOX_REQUEST_SUCCESS,
    DASHBOARD_REJECT_ORG_INBOX_REQUEST_ERROR,

    // VIEWS

    ORGANIZATION_CENTRIC_VIEW_LOAD,
    ORGANIZATION_CENTRIC_VIEW_LOAD_START,
    ORGANIZATION_CENTRIC_VIEW_LOAD_SUCCESS,
    ORGANIZATION_CENTRIC_VIEW_LOAD_ERROR,
    ORGANIZATION_CENTRIC_VIEW_UNLOAD,

    // ENTITIES

    ENTITY_USER_LOADER,
    ENTITY_USER_LOADER_START,
    ENTITY_USER_LOADER_SUCCESS,
    ENTITY_USER_LOADER_ERROR,

    ENTITY_ORGANIZATION_LOADER,
    ENTITY_ORGANIZATION_LOADER_START,
    ENTITY_ORGANIZATION_LOADER_SUCCESS,
    ENTITY_ORGANIZATION_LOADER_ERROR,

    ENTITY_NARRATIVE_LOAD,
    ENTITY_NARRATIVE_LOAD_START,
    ENTITY_NARRATIVE_LOAD_SUCCESS,
    ENTITY_NARRATIVE_LOAD_ERROR,

    // GLOBAL ACTIONS
    GLOBAL_ACCESS_NARRATIVE,
    GLOBAL_ACCESS_NARRATIVE_START,
    GLOBAL_ACCESS_NARRATIVE_SUCCESS,
    GLOBAL_ACCESS_NARRATIVE_ERROR,

    // NOTIFICATIONS
    NOTIFICATIONS_LOAD,
    NOTIFICATIONS_LOAD_START,
    NOTIFICATIONS_LOAD_SUCCESS,
    NOTIFICATIONS_LOAD_ERROR,
    NOTIFICATIONS_UNLOAD,

    NOTIFICATIONS_READ,
    NOTIFICATIONS_READ_START,
    NOTIFICATIONS_READ_SUCCESS,
    NOTIFICATIONS_READ_ERROR
}
