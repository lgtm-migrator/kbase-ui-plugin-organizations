import { ExclamationCircleOutlined, LinkOutlined, LockOutlined, GlobalOutlined, QuestionOutlined, CloseOutlined, ExclamationOutlined, RollbackOutlined, SaveOutlined } from "@ant-design/icons";
import { AppError } from '@kbase/ui-components';
import { Button, Modal, Input, Checkbox, Tooltip, Collapse, Tabs } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import TextArea from 'antd/lib/input/TextArea';
import DOMPurify from "dompurify";
import * as React from 'react';
import {marked} from 'marked';
import md5 from 'md5';

import OrgLogo from '../../OrgLogo';
import './component.css';
import {
    EditState, SaveState, ValidationState, EditableOrganization,
    ValidationErrorType, Editable, SyncState, EditableString,
    EditableNullableString, EditableBoolean
} from '../../../redux/store/types/common';
import { redirect } from '../../../ui/utils';

export interface NewOrganizationProps {
    editState: EditState,
    saveState: SaveState,
    validationState: ValidationState,
    error: AppError | null,
    newOrganization: EditableOrganization,
    onSave: () => void,
    onUpdateName: (name: string) => void,
    onUpdateId: (id: string) => void,
    onUpdateDescription: (description: string) => void;
    onUpdateIsPrivate: (isPrivate: boolean) => void;
    onUpdateLogoUrl: (logoUrl: string) => void;
    onUpdateHomeUrl: (homeUrl: string) => void;
    onUpdateResearchInterests: (researchInterests: string) => void;
}

export interface NewOrganizationState {
    cancelToBrowser: boolean;
    showError: boolean;
}

class NewOrganization extends React.Component<NewOrganizationProps, NewOrganizationState> {
    origin: string;

    constructor(props: NewOrganizationProps) {
        super(props);
        this.state = {
            cancelToBrowser: false,
            showError: true
        };
        this.origin = document.location!.origin;
    }

    onClickCancelToBrowser() {
        if (!this.isModified()) {
            this.setState({ cancelToBrowser: true });
            return;
        }

        const confirm = () => {
            this.setState({ cancelToBrowser: true });
        };
        const cancel = () => {
        };
        Modal.confirm({
            title: 'Leave the editor?',
            content: (
                <div>
                    <p>You have entered information for this new organization.</p>

                    <p>If you leave the editor without first saving, the new organization <i>will not be created</i>.</p>

                    <p><b>Continue to leave the editor?</b></p>
                </div>
            ),
            onOk: confirm,
            onCancel: cancel,
            okText: 'Yes',
            cancelText: 'No'
        });
    }

    onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.props.onSave();
    }

    onNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
        e.persist();
        this.props.onUpdateName(e.target.value);
    }

    onDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
        e.persist();
        this.props.onUpdateDescription(e.target.value);
    }

    onIdChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.persist();
        this.props.onUpdateId(e.target.value);
    }

    onLogoUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.persist();
        this.props.onUpdateLogoUrl(e.target.value);
    }

    onHomeUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.persist();
        this.props.onUpdateHomeUrl(e.target.value);
    }

    onResearchInterestsChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
        e.persist();
        this.props.onUpdateResearchInterests(e.target.value);
    }

    onIsPrivateChange(e: CheckboxChangeEvent) {
        this.props.onUpdateIsPrivate(e.target.checked);
    }

    canSave() {
        return (
            this.props.editState === EditState.EDITED &&
            this.props.validationState.type === ValidationErrorType.OK &&
            (this.props.saveState === SaveState.NEW ||
                this.props.saveState === SaveState.READY ||
                this.props.saveState === SaveState.SAVED)
        );
    }

    isModified() {
        return (
            this.props.editState === EditState.EDITED &&
            this.props.saveState === SaveState.NEW
        );
    }

    calcFieldClass(field: Editable) {
        switch (field.validationState.type) {
            // case (ValidationErrorType.OK):
            //     return 'validation-ok'
            case (ValidationErrorType.ERROR):
                return 'validation-error Lite';
            case (ValidationErrorType.REQUIRED_MISSING):
                return 'validation-error Lite';
        }

        switch (field.syncState) {
            case (SyncState.DIRTY):
                return 'sync-dirty Lite';
            default:
                return 'validation-ok Lite';
        }
    }

    renderFieldError(field: Editable) {
        if (field.validationState.type !== ValidationErrorType.OK) {
            if (field.syncState === SyncState.DIRTY) {
                return (
                    <span style={{ color: 'red' }}>
                        {field.validationState.message}
                    </span>
                );
            }
        } else {
            return '';
        }
    }

    renderNameRow(nameField: EditableString, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) {
        const tooltip = (
            <React.Fragment>
                <p>
                    This is the name for your organization as you want KBase users to see it; you may change it at any time.
                </p>
                <p>
                    It may be composed of ordinary text, but does not accept formatting.
                </p>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                required
                            </th>
                            <td>
                                yes
                            </td>
                        </tr>
                        <tr>
                            <th>
                                max length
                            </th>
                            <td>
                                1024 characters
                            </td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
        const placeholder = 'Your Organization\'s display name';
        return (
            <div className="NewOrganization-row">
                <div className="NewOrganization-col1">
                    <div className="NewOrganization-formLabel field-label">
                        <Tooltip title={tooltip}>
                            <span>Name</span>
                        </Tooltip>
                    </div>
                </div>
                <div className="NewOrganization-col2">
                    <div className="NewOrganization-formControl">
                        <Input value={nameField.value || ''}
                            className={this.calcFieldClass(nameField)}
                            placeholder={placeholder}
                            autoFocus
                            onChange={onChange} />
                        {this.renderFieldError(nameField)}
                    </div>
                </div>
            </div>
        );
    }

    renderIDRow(idField: EditableString, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) {
        const tooltip = (
            <React.Fragment>
                <p>
                    Each Organization has a unique identifier. The ID is set when the organization is created, and are permanent: It may never be changed.
                </p>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                required
                            </th>
                            <td>
                                yes
                            </td>
                        </tr>
                        <tr>
                            <th>
                                max length
                            </th>
                            <td>
                                100 characters
                            </td>
                        </tr>
                        <tr>
                            <th>
                                allowed
                            </th>
                            <td>
                                a to z, 0 to 9, -
                            </td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
        const placeholder = "A unique ID for your Organization";
        return (
            <div className="NewOrganization-row">
                <div className="NewOrganization-col1">
                    <div className="NewOrganization-formLabel field-label">
                        <Tooltip title={tooltip}>
                            <span>ID</span>
                        </Tooltip>
                    </div>
                </div>
                <div className="NewOrganization-col2">
                    <div className="NewOrganization-formControl">
                        <Input value={idField.value || ''}
                            className={this.calcFieldClass(idField)}
                            placeholder={placeholder}
                            onChange={onChange} />
                        {this.renderFieldError(idField)}
                    </div>
                </div>
            </div>
        );
    }

    renderLogoURLRow(logoUrlField: EditableNullableString, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) {
        const tooltip = (
            <React.Fragment>
                <p>
                    Each Organization will display a logo. You may specific your own logo by entering the URL for an image, or leave
                    this field blank and a default logo will be displayed, using the first letter of your org name and a randomly
                    generated color (based on your org id).
                </p>
                <p>
                    Please don't use large images, and try to keep them roughly square. The logo image display will be constrained
                    to no larger than 100 pixels wide. Non-square logos may not look good in the Orgs list or on your Org page.
                </p>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                required
                            </th>
                            <td>
                                no
                            </td>
                        </tr>

                        <tr>
                            <th>
                                max length
                            </th>
                            <td>
                                1000 characters
                            </td>
                        </tr>
                        <tr>
                            <th>
                                allowed
                            </th>
                            <td>
                                a full https:// url. E.g. https://my.org/myimage.png<br />
                                note that only <i>https</i> urls are accepted.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
        const placeholder = "The URL for your Organization's logo (optional)";
        return (
            <div className="NewOrganization-row">
                <div className="NewOrganization-col1">
                    <div className="NewOrganization-formLabel field-label">
                        <Tooltip title={tooltip}>
                            <span>Logo URL</span>
                        </Tooltip>
                    </div>
                </div>
                <div className="NewOrganization-col2">
                    <div className="NewOrganization-formField">
                        <div className="NewOrganization-formControl">
                            <Input value={logoUrlField.value || ''}
                                className={this.calcFieldClass(logoUrlField)}
                                placeholder={placeholder}
                                onChange={this.onLogoUrlChange.bind(this)} />
                            {this.renderFieldError(logoUrlField)}
                        </div>
                        <div className="NewOrganization-formFieldPreview">
                            {this.renderLogoPreview(logoUrlField)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderBrokenHomeURL() {
        const tooltipTitle = 'The Home URL is broken; either correct it or leave it empty';
        return (
            <Tooltip title={tooltipTitle}>
                <ExclamationCircleOutlined style={{ color: 'gray' }} />
            </Tooltip>
        );
    }

    renderHomeURLPreview(homeUrlField: EditableNullableString) {
        if (homeUrlField.value === null || homeUrlField.value.length === 0) {
            const tooltipTitle = 'When you have completed your url, you may preview it here.';
            return (
                <div className="NewOrganization-previewBox">
                    <Tooltip title={tooltipTitle}>
                        <LinkOutlined style={{ color: 'gray' }} />
                    </Tooltip>
                </div>
            );
        }

        if (homeUrlField.validationState.type !== ValidationErrorType.OK) {
            return (
                <div className="NewOrganization-previewBox">
                    {this.renderBrokenHomeURL()}
                </div>
            );
        }

        const tooltipTitle = 'Try out your url by clicking this link';
        return (
            <div className="NewOrganization-previewBox">
                <Tooltip title={tooltipTitle} >
                    <a href={homeUrlField.value} target="_blank" rel="noopener noreferrer">
                        <LinkOutlined />
                    </a>
                </Tooltip>
            </div>
        );
    }

    renderHomeURLRow(homeUrlField: EditableNullableString, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) {
        const tooltip = (
            <React.Fragment>
                <p>
                    Each Organization may display a home page url. This should be considered the canonical home for your Organization, if
                    it also exists outside of KBase.
                </p>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                required
                            </th>
                            <td>
                                no
                            </td>
                        </tr>

                        <tr>
                            <th>
                                max length
                            </th>
                            <td>
                                1000 characters
                            </td>
                        </tr>
                        <tr>
                            <th>
                                allowed
                            </th>
                            <td>
                                a full url. E.g. http://my.org/myimage.png<br />
                                note that both <i>http</i> and <i>https</i> urls are accepted.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
        const placeholder = "The url for your Organization's home page (optional)";
        return (
            <div className="NewOrganization-row">
                <div className="NewOrganization-col1">
                    <div className="NewOrganization-formLabel field-label">
                        <Tooltip title={tooltip}>
                            <span>Home Page URL</span>
                        </Tooltip>
                    </div>
                </div>
                <div className="NewOrganization-col2">
                    <div className="NewOrganization-formField">
                        <div className="NewOrganization-formControl">
                            <Input value={homeUrlField.value || ''}
                                className={this.calcFieldClass(homeUrlField)}
                                placeholder={placeholder}
                                onChange={onChange} />
                            {this.renderFieldError(homeUrlField)}
                        </div>
                        <div className="NewOrganization-formFieldPreview">
                            {this.renderHomeURLPreview(homeUrlField)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderCollapse(content: JSX.Element) {
        const style = {
            background: 'transparent',
            borderRadius: 0,
            margin: 0,
            border: 0,
            overflow: 'hidden'
        };
        return (
            <Collapse bordered={false}>
                <Collapse.Panel header="What about inviting users?" key="invite" style={style}>
                    {content}
                </Collapse.Panel>
            </Collapse>
        );
    }

    renderPrivatePublicRow(isPrivateField: EditableBoolean, onChange: (e: CheckboxChangeEvent) => void) {
        const tooltip = (
            <React.Fragment>
                <p>
                    Set the Organization to "hidden" to prevent it from appearing in the listing and from being exposed
                    as an Org page for any non-member.
                </p>
                <p>
                    You may invite users directly to your org. When doing so they will receive a notification with a link to the
                    org page. When a user lands on the org page they will not be shown information about the org, but will be available
                    to accept the invitation and instantly have access to it.
                </p>
                <p>
                    A user with an invitation who lands on the org page will not see information about the org, but will be able to
                    submit a Join request.
                </p>
                {/* {this.renderCollapse((
                    <React.Fragment>
                        <p>
                            You may invite users directly to your org. When doing so they will receive a notification with a link to the
                            org page. When a user lands on the org page they will not be shown information about the org, but will be available
                            to accept the invitation and instantly have access to it.
                        </p>
                        <p>
                            A user with an invitation who lands on the org page will not see information about the org, but will be able to
                            submit a Join request.
                        </p>
                    </React.Fragment>
                ))} */}

                <table>
                    <tbody>
                        <tr>
                            <th>
                                required
                            </th>
                            <td>
                                no
                            </td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
        return (
            <div className="NewOrganization-row">
                <div className="NewOrganization-col1">
                    <div className="NewOrganization-formLabel field-label">
                        <Tooltip title={tooltip}>
                            <span>Hidden?</span>
                        </Tooltip>
                    </div>
                </div>
                <div className="NewOrganization-col2">
                    <div className="NewOrganization-formControl">
                        <div>
                            <Checkbox
                                checked={isPrivateField.value}
                                className={this.calcFieldClass(isPrivateField)}
                                onChange={onChange} />
                            {this.renderIsPrivate(isPrivateField.value)}
                        </div>
                        {this.renderFieldError(isPrivateField)}
                    </div>
                </div>
            </div>
        );
    }

    renderResearchInterestsRow(researchInterestsField: EditableString, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void) {
        const tooltip = (
            <React.Fragment>
                <p>
                    Each organization must have a short description of research interests or purpose.
                </p>
                <p>
                    This text is displayed in the organizations list and the organization's page. It is most helpful
                    in the list context to help users quickly scan the list.
                </p>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                required
                            </th>
                            <td>
                                yes
                            </td>
                        </tr>

                        <tr>
                            <th>
                                max length
                            </th>
                            <td>
                                200 characters
                            </td>
                        </tr>
                        <tr>
                            <th>
                                allowed
                            </th>
                            <td>
                                unformatted text
                            </td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
        const placeholder = 'List your areas of interest. Systems biology, microbial ecology, plant genomics';
        return (
            <div className="NewOrganization-row">
                <div className="NewOrganization-col1">
                    <div className="NewOrganization-formLabel field-label">
                        <Tooltip title={tooltip}>
                            <span>Research Interests</span>
                        </Tooltip>
                    </div>
                </div>
                <div className="NewOrganization-col2">
                    <div className="NewOrganization-formControl">

                        <TextArea value={researchInterestsField.value || ''}
                            className={this.calcFieldClass(researchInterestsField) + ' NewOrganization-control-researchInterests'}
                            autoSize={{ minRows: 2, maxRows: 2 }}
                            placeholder={placeholder}
                            onChange={onChange} />
                        {this.renderFieldError(researchInterestsField)}
                    </div>
                </div>
            </div>
        );
    }

    renderDescriptionRow(descriptionField: EditableString, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void) {
        const tooltip = (
            <React.Fragment>
                <p>
                    Each organization must have a description which communicates the purpose of this organization.
                </p>
                <p>
                    The description is in <a href="https://daringfireball.net/projects/markdown/syntax" target="_blank" rel="noopener noreferrer">markdown</a> format
                    and may be quite long. It will be presented in a scrolling area.
                </p>
                <p>
                    Please be mindful of embedding large images or other content which may interfere with the display of your Organization.
                </p>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                required
                            </th>
                            <td>
                                yes
                            </td>
                        </tr>

                        <tr>
                            <th>
                                max length
                            </th>
                            <td>
                                1024 characters
                            </td>
                        </tr>
                        <tr>
                            <th>
                                allowed
                            </th>
                            <td>
                                standard <a href="https://daringfireball.net/projects/markdown/syntax" target="_blank" rel="noopener noreferrer">markdown</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
        const placeholder = 'Text or Markdown describing your Organization';
        return (
            <div className="NewOrganization-row">
                <div className="NewOrganization-col1">
                    <div className="NewOrganization-formLabel field-label">
                        <Tooltip title={tooltip}>
                            <span>Description</span>
                        </Tooltip>
                    </div>
                </div>
                <div className="NewOrganization-col2">
                    <div className="NewOrganization-formControl">
                        <Tabs defaultActiveKey="editor" animated={false}>
                            <Tabs.TabPane tab="Editor" key="editor">
                                <TextArea value={descriptionField.value || ''}
                                    className={this.calcFieldClass(descriptionField) + ' NewOrganization-control-description'}
                                    autoSize={{ minRows: 5, maxRows: 15 }}
                                    placeholder={placeholder}
                                    onChange={onChange} />
                                {this.renderFieldError(descriptionField)}
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Preview" key="preview">
                                <div className="NewOrganization-preview-description"
                                    // xss safe
                                    dangerouslySetInnerHTML={({__html: DOMPurify.sanitize(marked.parse(descriptionField.value || ''))})}
                                />
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }

    renderEditorHeader() {
        return (
            <div className="NewOrganization-row">
                <div className="NewOrganization-col1">
                </div>
                <div className="NewOrganization-col2">
                    <div style={{ flex: '1 1 0px' }}>
                        <h3>Create Your Organization</h3>
                    </div>
                </div>
            </div>
        );
    }

    renderEditor() {
        return (
            <form id="newOrganizationForm" className="NewOrganization-editor  scrollable-flex-column" onSubmit={this.onSubmit.bind(this)}>
                {this.renderEditorHeader()}
                <div className="NewOrganization-body">
                    {this.renderNameRow(this.props.newOrganization.name, this.onNameChange.bind(this))}
                    {this.renderIDRow(this.props.newOrganization.id, this.onIdChange.bind(this))}
                    {this.renderLogoURLRow(this.props.newOrganization.logoUrl, this.onLogoUrlChange.bind(this))}
                    {this.renderHomeURLRow(this.props.newOrganization.homeUrl, this.onHomeUrlChange.bind(this))}
                    {this.renderPrivatePublicRow(this.props.newOrganization.isPrivate, this.onIsPrivateChange.bind(this))}
                    {this.renderResearchInterestsRow(this.props.newOrganization.researchInterests, this.onResearchInterestsChange.bind(this))}
                    {this.renderDescriptionRow(this.props.newOrganization.description, this.onDescriptionChange.bind(this))}
                    <div className="NewOrganization-row">
                        <div className="NewOrganization-col1">
                        </div>
                        <div className="NewOrganization-col2" style={{ textAlign: 'center' }}>
                            <div className="ButtonSet">
                                <span className="ButtonSet-button">
                                    {this.renderSaveButton()}
                                </span>
                                <span className="ButtonSet-button">
                                    {this.renderCancelButton()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    charAt(inString: string, position: number) {
        const c1 = inString.charCodeAt(position);
        if (c1 >= 0xD800 && c1 <= 0xDBFF && inString.length > position + 1) {
            const c2 = inString.charCodeAt(position + 1);
            if (c2 > 0xDC00 && c2 <= 0xDFFF) {
                return inString.substring(position, 2);
            }
        }
        return inString.substring(position, 1);
    }

    renderLogo(org: EditableOrganization) {
        return (
            <OrgLogo logoUrl={null} size={64} organizationName={org.name.value} organizationId={org.id.value} />
        );
    }

    renderIsPrivate(isPrivate: boolean) {
        if (isPrivate) {
            return (
                <span>
                    <LockOutlined />{' '}Hidden - will be visible <b>only</b> for members of this organization
                </span>
            );
        }
        return (
            <span>
                <GlobalOutlined />{' '}Visible - will be visible to all KBase users.
            </span>
        );
    }

    renderDefaultLogo() {
        if (!(this.props.newOrganization.name.value && this.props.newOrganization.id.value)) {
            const tooltipTitle = 'Add a logo url or complete the name and id fields for a Default logo';
            return (
                <Tooltip title={tooltipTitle}>
                    <QuestionOutlined style={{ color: 'gray' }} />
                </Tooltip>
            );
        }
        const initial = this.charAt(this.props.newOrganization.name.value, 0).toUpperCase();
        const hash = md5(this.props.newOrganization.id.value);
        const size = 30;
        const color = hash.substr(0, 6);
        return (
            <svg width={size} height={size} style={{ border: '1px rgba(200, 200, 200, 0.5) solid' }}>
                <text x="50%" y="50%" dy={4} textAnchor="middle" dominantBaseline="middle" fontSize={size - 12} fill={'#' + color} fontFamily="sans-serif">{initial}</text>
            </svg>
        );
    }

    renderBrokenLogo() {
        const tooltipTitle = 'The Logo URL is broken; either correct it or empty the field for the default logo';
        return (
            <Tooltip title={tooltipTitle}>
                <ExclamationCircleOutlined style={{ color: 'gray' }} />
            </Tooltip>
        );
    }

    renderLogoPreview(logoUrlField: EditableNullableString) {
        if (logoUrlField.value === null || logoUrlField.value.length === 0) {
            return (
                <div className="NewOrganization-previewBox">
                    {this.renderDefaultLogo()}
                </div>
            );
        }

        if (logoUrlField.validationState.type !== ValidationErrorType.OK) {
            return (
                <div className="NewOrganization-previewBox">
                    {this.renderBrokenLogo()}
                </div>
            );
        }

        return (
            <div className="NewOrganization-previewBox">
                <img
                    src={logoUrlField.value}
                    width={30}
                    alt="Logo for your new organization"
                />
            </div>
        );
    }

    renderState() {
        const { editState, validationState, saveState } = this.props;
        const label = 'edit: ' + editState + ', valid: ' + validationState + ', save: ' + saveState;
        return (
            <span style={{ marginRight: '10px' }}>{label}</span>
        );
    }

    toggleError() {
        this.setState({ showError: !this.state.showError });
    }

    renderError() {
        if (this.props.error && this.state.showError) {
            const onOk = () => {
                this.setState({ showError: false });
            };
            const onCancel = () => {
                this.setState({ showError: false });
            };
            let trace;
            if (this.props.error.trace) {
                trace = this.props.error.trace.map((line, index) => {
                    return (
                        <div key={"line_" + index}>{line}</div>
                    );
                });
            }
            if (trace) {
                trace = (
                    <div>
                        <div>trace</div>
                        {trace}
                    </div>
                );
            }
            return (
                <Modal visible={true}
                    title="Error"
                    okType="danger"
                    okText="Close"
                    cancelText="Clear Error"
                    onCancel={onCancel}
                    onOk={onOk}>
                    <div style={{ fontWeight: 'bold' }}>
                        {this.props.error.code}
                    </div>
                    <div>
                        {this.props.error.message}
                    </div>
                    {trace}
                </Modal>
            );
        }
    }

    renderSaveButton() {
        return (
            <Button icon={<SaveOutlined />}
                type="primary"
                form="newOrganizationForm"
                key="submit"
                disabled={!this.canSave.call(this)}
                htmlType="submit">
                Save
            </Button>
        );
    }

    renderCancelButton() {
        return (
            <Button danger onClick={this.onClickCancelToBrowser.bind(this)} >
                <CloseOutlined />{' '}Close
            </Button>
        );
    }

    renderMenuButtons() {
        let errorButton;
        if (this.props.error) {
            errorButton = (
                <span className="ButtonSet-button">
                    <Button shape="circle" icon={<ExclamationOutlined />} danger onClick={this.toggleError.bind(this)}></Button>
                </span>
            );
        }
        return (
            <div className="ButtonSet">
                <span className="ButtonSet-button">
                    <Button type="default" onClick={this.onClickCancelToBrowser.bind(this)} >
                        <RollbackOutlined />{' '}Back
                    </Button>
                </span>
                <span className="ButtonSet-button">
                    {this.renderSaveButton()}
                </span>
                {errorButton}
            </div>
        );
    }

    render() {
        if (this.state.cancelToBrowser) {
            redirect('orgs');
        }

        // TODO: this is just a prop for today.
        if (this.props.saveState === SaveState.SAVED) {
            redirect(`orgs/${this.props.newOrganization.id.value}`);
        }

        return (
            <div className="NewOrganization scrollable-flex-column">
                <div className="NewOrganization-main scrollable-flex-column">
                    {this.renderEditor()}
                </div>
                {/* TODO: improve error display*/}
                {this.renderError()}
            </div>
        );
    }
}

export default NewOrganization;
